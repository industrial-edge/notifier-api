# Implement Notifier OpenAPI within a custom app

- [Implement Notifier OpenAPI within a custom app](#implement-notifier-openapi-within-a-custom-app)
  - [Build application](#build-application)
  - [Upload  App to the Industrial Edge Managment](#upload--app-to-the-industrial-edge-managment)
  - [Deploying of App](#deploying-of-app)
    - [Configuring application](#configuring-application)
    - [Installing application](#installing-application)
  - [Configure PLC project](#configure-plc-project)
  - [Configure PLC Connection](#configure-plc-connection)
  - [Test the application](#test-the-application)

This app calculates and monitors a KPI value, which input data is coming from the S7 Connector into the Databus. The app connects to the Databus via MQTT and and subscribes to the S7 Connector topic. The defined tags containing the KPI data are queried and the KPI value is calculated frequently. In case the defined min and max limits are passed, a notification message is send to the Notifier app on the IED.

The app is implemented with **JavaScript** in Docker, using the **XMLHttpRequest** API to transfer data via HTTP.

To use the app, the user must define a user and password for the Databus, the Data Service asset that is used, two input tags that are coming from S7 Connector, as well as a min and max limit of the KPI value.

![overview_app](/docs/graphics/overview_app.png)

## Build application

- Download the source code to your engineering VM
- Open a console in the source code folder where the docker-compose.yml file is located
- Use command `docker-compose build` to create the docker image
- This docker image can now be used to build you app with the Industrial Edge App Publisher
- *docker images | grep kpi_notifier* can be used to check for the images

## Upload  App to the Industrial Edge Managment

Please find below a short description how to publish your application in your IEM.

- Connect your Industrial Edge App Publisher to your docker engine
- Connect your Industrial Edge App Publisher to your Industrial Edge Managment System
- Create a new application
- Add a new version for the application
- Import the [docker-compose](/docker-compose.yml) file using the **Import YAML** button
- Review, validate and create the version
- The warning `Build (sevices >> scanner-service) is not supported` can be ignored

![publisher_create](/docs/graphics/publisher_create.png)

- **Start Upload** to transfer the app to Industrial Edge Managment

![iem_app](/docs/graphics/iem_app.png)

For more detailed information please see the section for [uploading apps to the IEM](https://github.com/industrial-edge/upload-app-to-iem).

## Deploying of App

### Configuring application

For this KPI calculation and notification app, several parameter need to be configured in advance:

- "MQTT_USER": username of the databus user
- "MQTT_PASSWORD": password of the databus user
- "TAG_FAULTY": S7 connector tag for faulty value (e.g. "faulty" for S7 or "GDB.process.numberFaulty" for OpcUa)
- "TAG_PRODUCED": S7 connector tag for produced value  (e.g. "produced" for S7 or "GDB.process.numberProduced" for OpcUa)
- "LIMIT_MIN": minimum limit value for the KPI value
- "LIMIT_MAX": maximum limit value for the KPI value
- "ASSET": data service asset, that is necessary for the notifications

The configuration file has to be named *mqtt-config.json*.

This repository provides two config files:

- fix configuration via config file (find file [here](/cfg-data/mqtt-config.json))

```json
{
    "MQTT_USER":"edge",
    "MQTT_PASSWORD":"edge",
    "TAG_FAULTY":"GDB.process.numberFaulty",
    "TAG_PRODUCED":"GDB.process.numberProduced",
    "LIMIT_MIN":"70",
    "LIMIT_MAX":"90",
    "ASSET":"549c3daa33cd4628b02c2e2745f54d80"
}
```

- flexible configuration with UI via Configuration Service app (find file [here](/cfg-data/json_schema/mqtt-config.json))

![config_ui](/docs/graphics/config_ui.png)

### Installing application

The KPI calculation and notification app should be already uploaded to you Edge management system and a configuration method should be available. Install the app with proper configuration on your Edge device.

## Configure PLC project

- Open TIA portal and open the project containing the filling application
- Download the PLC program to the PLC and set the PLC into RUN
- Open the HMI to start the filling application

## Configure PLC Connection

To read data from the PLC and provide the data, use the S7 Connector to establish a connection to the PLC (e.g. via OPC UA or S7). Create two tags for faulty and produced value.

![s7_connector](/docs/graphics/s7_connector.png)

The S7 Connector sends the data to the Databus, from where the app collects the data for the KPI calculation. Therefore you need to create a suitable Databus topic.

![databus](/docs/graphics/databus.png)

## Test the application

- Go to your Edge device and start the KPI calculation and notification app
- Make sure that the defined S7 Connector tags for faulty and produced value deliver valid data
- The app uses the following formula to calculate the KPI value: `quality [%] = 100 - ( <faulty> / <produced> * 100 )`
- As soon as one of the defined limits (min/max) is passed, the app sends a notification to the Notifier
- You can watch the incoming notifications on the Notifier UI

![notification_min](/docs/graphics/notification_min.png)

![notification_max](/docs/graphics/notification_max.png)
