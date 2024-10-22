/*
Copyright (c) Siemens 2021
This file is subject to the terms and conditions of the MIT License.  
See LICENSE file in the top-level directory
*/

// allows untrusted certificates (not verified by a certificate authority)
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// -------- Requirements ---------

var mqtt = require('mqtt');										// MQTT client
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; 	// http API for javascript


// -------- Parameter -----------

const MQTT_META = 'ie/m/j/simatic/v1/s7c1/dp';
const MQTT_DATA = 'ie/d/j/simatic/v1/s7c1/dp/#';
const MQTT_DATA_PREFIX = 'ie/d/j/simatic/v1/s7c1/dp/';
const MQTT_IP = 'ie-databus';

var MQTT_USER;
var MQTT_PASSWORD;
var MQTT_TOPIC_1;
var MQTT_TOPIC_2;
var LIMIT_MIN;
var LIMIT_MAX;
var ASSET;

var mqttClient;
var value1;
var value2;
var result;
var calcKPI1 = false;
var calcKPI2 = false;
var minLimit = false;
var minLimitPrev = false;
var maxLimit = false;
var maxLimitPrev = false;

var topic1_id;
var topic2_id;

var postMin;
var postMax;

// ----------- Notifier API ------------

const notificationSource = 'KPI calculation app';
const urlRaise = 'http://notifier:4201/notificationservice/notifications/ext/raise';


// -------------
// Start program
// -------------

console.log('Starting app...');
programSequence();


function programSequence(){
	try{

		// Get parameter out of config file
		getMqttParams();

		// Create request bodys
		postMin = JSON.stringify({
		  'notificationTypeId': '2',
		  'eventText': 'KPI value under defined limit of ' + LIMIT_MIN,
		  'assetId': ASSET,
		  'notificationSource': 'KPI calculation app'
		});

		console.log('postMin: ' + postMin);
	
		postMax = JSON.stringify({
		  'notificationTypeId': '2',
		  'eventText': 'KPI value over defined limit of ' + LIMIT_MAX,
		  'assetId': ASSET,
		  'notificationSource': 'KPI calculation app'
		});
		
		console.log('postMax: ' + postMax);

		// Connect to mqtt server
		connectToMqtt().then(() => {		
			
			// Calculate KPI
			calculateKPI();
		});
	}
	catch(error)
	{
		console.log('Error in program sequence: ' + error);
	}
}

function getMqttParams() {
	try{	
		console.log('Starting function getMqttParams()');
	
		var params = require('/cfg-data/mqtt-config.json');
		
		MQTT_USER = params.MQTT_USER ;
		MQTT_PASSWORD = params.MQTT_PASSWORD ;
		MQTT_TOPIC_1 = params.TAG_FAULTY;
		MQTT_TOPIC_2 = params.TAG_PRODUCED;
		LIMIT_MIN = params.LIMIT_MIN;
		LIMIT_MAX = params.LIMIT_MAX;
		ASSET = params.ASSET;
		
		console.log('MQTT_USER = ' + MQTT_USER);
		console.log('MQTT_PASSWORD = ' + MQTT_PASSWORD);
		console.log('MQTT_TOPIC_1 = ' + MQTT_TOPIC_1);
		console.log('MQTT_TOPIC_2 = ' + MQTT_TOPIC_2);
		console.log('LIMIT_MIN = ' + LIMIT_MIN);
		console.log('LIMIT_MAX = ' + LIMIT_MAX);
		console.log('ASSET = ' + ASSET);
	}
	catch (error){
		console.log('Error in function getMqttParams: ' + error);
	}
}

async function connectToMqtt() {
	try{
		console.log('Starting function connectToMqtt()');
		
		// Options for mqtt connect
		const optionsMqtt = {
			'clientId': 'mqttjs_' + Math.random().toString(16).substr(2, 8),
			'protocolId': 'MQTT',
			'username': MQTT_USER,
			'password': MQTT_PASSWORD
		}

		// Connect mqtt client to databus (mqtt broker)
		mqttClient = await mqtt.connect('mqtt://' + MQTT_IP, optionsMqtt);

		// Subscribe to topics after connection is established
		await mqttClient.on('connect', () => {
			console.log('Connected to ' + MQTT_IP);


			// Subscribe to s7 connector - metadata
			mqttClient.subscribe(MQTT_META, () =>  {
				console.log('Subscribed to ' + MQTT_META);
			});
			
			// Subscribe to s7 connector - data
			mqttClient.subscribe(MQTT_DATA, () =>  {
				console.log('Subscribed to ' + MQTT_DATA);
			});
					
/*			mqttClient.subscribe(MQTT_TOPIC_1, () =>  {
				console.log('Subscribed to ' + MQTT_TOPIC_1);
			});
			
			mqttClient.subscribe(MQTT_TOPIC_2, () =>  {
				console.log('Subscribed to ' + MQTT_TOPIC_2);
			});
*/
		});
	}
	catch (error){
		console.log('Error in function connectToMqtt: ' + error);
	}
}

function calculateKPI() {
	try{
		console.log('Starting function calculateKPI()');
				
		// Receive data from topics
		mqttClient.on('message', function (topic, message) {
			
			//console.log('incoming topic: ' + topic);
						
			// Receive meta data from s7 connector
			// -----------------------------------
			if(topic == MQTT_META)
			{
				console.log('S7 Connector meta data = ' + message);
						
				var data = JSON.parse(message);
				//console.log('number of connections: ' + Object.keys(data.connections).length);
						
				// Iterate through connections
				// ---------------------------
				data.connections.forEach(connection =>
				{
					//console.log('number of data points: ' + Object.keys(connection.dataPoints).length);

					// Iterate through data points
					// ---------------------------
					connection.dataPoints.forEach( dataPoint => {
						
						//console.log('number of data point definitions: ' + Object.keys(dataPoint.dataPointDefinitions).length);

						// Iterate through dataPointDefinitions
						// -------------------------------------
						dataPoint.dataPointDefinitions.forEach(dataPointDefinition => {
							
							//console.log('name = ' + dataPointDefinition.name);			// "name = \"GDB\".\"process\".\"numberFaulty\"\n"
							//console.log('id = ' + dataPointDefinition.id);				// "id = 101\n"
							//console.log('dataType = ' + dataPointDefinition.dataType);	// "dataType = Int\n"									
							//console.log('-----------------------');
							
							// reformat name string						
							var tagName = dataPointDefinition.name.replaceAll("\"","");			// GDB.process.numberFaulty
							//console.log('tag = ' + tagName);
							
							if (tagName == MQTT_TOPIC_1){
								topic1_id = dataPointDefinition.id;
								console.log('--------------------------------------------');
								console.log('META topic 1 :');
								console.log('tag name = ' + tagName);
								console.log('topic1_id = ' + topic1_id);
								console.log('--------------------------------------------');
							}
							if (tagName == MQTT_TOPIC_2){
								topic2_id = dataPointDefinition.id;
								console.log('--------------------------------------------');
								console.log('META topic 2 :');
								console.log('tag name = ' + tagName);
								console.log('topic2_id = ' + topic2_id);
								console.log('--------------------------------------------');
							}
						});
					});
				});
				
				
			}
			
			// Receive data from s7 connector
			// -------------------------------
			
			if(topic.includes(MQTT_DATA_PREFIX))
			{
				//console.log('S7 Connector data = ' + message);
				var data = JSON.parse(message);
				
				//console.log('number of vals: ' + Object.keys(data.vals).length);
				
				// Iterate through vals
				// ---------------------
				data.vals.forEach(val =>
				{					
					if(val.id == topic1_id)
					{
						console.log('--------------------------------------------');
						console.log('DATA topic 1 :');
						console.log('id = ' + val.id);
						console.log('val = ' + val.val);
						console.log('--------------------------------------------');
						
						value1 = parseInt(val.val);
						
						// calc only if topic contains a number
						if(isNaN(value1))
							calcKPI1 = false;
						else
							calcKPI1 = true;
					}
					
					if(val.id == topic2_id)
					{
						console.log('--------------------------------------------');
						console.log('DATA topic 2 :');
						console.log('id = ' + val.id);
						console.log('val = ' + val.val);
						console.log('--------------------------------------------');
						
						value2 = parseInt(val.val);
						
						// calc only if topic contains a number
						if(isNaN(value2))
							calcKPI2 = false;
						else
							calcKPI2 = true;
					}
				});
			}
			
/*			
			if(topic == MQTT_TOPIC_1)
			{
				value1 = parseInt(message.toString());
				console.log(MQTT_TOPIC_1 + ' = ' + value1);
				
				// calc only if topic contains a number
				if(isNaN(value1))
					calcKPI1 = false;
				else
					calcKPI1 = true;
			}
			
			if(topic == MQTT_TOPIC_2)
			{
				value2 = parseInt(message.toString());
				console.log(MQTT_TOPIC_2 + ' = ' + value2);
				
				// calc only if topic contains a number
				if(isNaN(value2))
					calcKPI2 = false;
				else
					calcKPI2 = true;
			}
*/
			// Calc KPI value
			if(calcKPI1 && calcKPI2){
				
				// KPI formula
				result = 100 - (value1/value2 * 100);
				console.log('KPI result = ' + result);

				// Check min limit
				if(result < LIMIT_MIN)
				{
					minLimit = true;
					
					// Send notification
					if(minLimit && !minLimitPrev)
						sendNotification('min');
					
					minLimitPrev = minLimit;
				}
				else{
					minLimit = false;
					minLimitPrev = false;
				}
				
				// Check max limit
				if(result > LIMIT_MAX)
				{
					maxLimit = true;
					
					// Send notification
					if(maxLimit && !maxLimitPrev)
						sendNotification('max');
					
					maxLimitPrev = maxLimit;
				}
				else{
					maxLimit = false;
					maxLimitPrev = false;
				}
			}
		});
	}
	catch (error){
		console.log('Error in function calculateKPI: ' + error);
	}
}


function sendNotification(limitOption) {
	try{
		console.log('Starting function sendNotification() with option: ' + limitOption);
		
		//create XMLHttpRequest object
		const request = new XMLHttpRequest();
		
		//open a get request with the remote server URL
		request.open('POST', urlRaise);
		request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		// EVENT HANDLERS
		// --------------

		//triggered when the response is completed
		request.onload = function() {
			if (request.status === 200) {
				console.log('Request successfull');
			
				console.log('\n' + request.responseText);
				console.log('\n' + request.responseJSON);				
			} else if (request.status === 404) {
				console.log('No data found');
			}
			else{
				console.log('Api call failed: ' + request.status);
			}
		}

		//triggered when a network-level error occurs with the request
		request.onerror = function() {
			console.log('Network error occurred!');
		}

		//Send the Http request with the request body
		if(limitOption == 'min')
		{
			console.log('send min request');
			request.send(postMin);
		}
		
		if(limitOption == 'max')
		{
			console.log('send max request');
			request.send(postMax);
		}
	
	}
	catch (error){
		console.log('Error in function sendNotification: ' + error);
	}
}
