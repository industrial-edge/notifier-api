# Using Notifier OpenAPI within the Flow Creator

- [Using Notifier OpenAPI within the Flow Creator](#using-notifier-openapi-within-the-flow-creator)
  - [Launch the Flow Creator](#launch-the-flow-creator)
  - [List all notifications](#list-all-notifications)
  - [List one notification](#list-one-notification)
  - [Accept one notification](#accept-one-notification)
  - [Clear one notification](#clear-one-notification)
  - [Raise one notification](#raise-one-notification)

## Launch the Flow Creator

The Flow Creator, the Notifier and the custom app must be installed on the same Edge Device. Open and login to the Flow Creator. The following chapters describe how to execute the Notifier OpenAPI requests step by step. All OpenAPI commands are executed via a http request.

A ready-to-use flow, that contains all these steps, can be downloaded [here](/src/Flow.json) and imported into the Flow Creator.

## List all notifications

![api_get_all](/docs/graphics/api_get_all.png)

In case of passing the defined limits of the KPI value, the custom app sends notifications to the Notifier. These notifications can also be listet in the Flow Creator. Therefore the parameter "notificationSource" is necessary.

![flow_get_all](/docs/graphics/flow_get_all.png)

The following nodes are needed:

- inject
- function
- http request
- debug

The function "set params" sets the mandatory parameter, which is later used in the URL of the http request:

```javascript
msg.notificationSource = {}
msg.notificationSource = "CustomApp";
return msg;
```

In the http node configure a **GET** request with the following URL:

`http://notifier:4201/notificationservice/notifications/ext/active?notificationSource={{{notificationSource}}}`

---------

![api_old_get_all](/docs/graphics/api_old_get_all.png)

The **deprecated** API call (V1.0) also works. Therefore no parameter is necessary.

![flow_get_all_old](/docs/graphics/flow_get_all_old.png)

The following nodes are needed:

- inject
- http request
- debug

In the http node configure a **GET** request with the following URL:

`http://notifier:4201/notificationservice/notifications`

---------

To get all currently active notifications via these Flow Creator nodes, just trigger the inject node.

=========> Screenhot missing !!!

## List one notification

![api_get_one](/docs/graphics/api_get_one.png)

It is also possible to list just one specific notification which is active. Therefore the parameter "notificationId" and "notificationSource" are necessary.

![flow_get_one](/docs/graphics/flow_get_one.png)

The function "set params" sets the mandatory parameter, which are later used in the URL of the http request:

```javascript
msg.notificationId = {}
msg.notificationSource = {}
msg.notificationId = "8";
msg.notificationSource = "CustomApp";
return msg;
```

In the http node configure a **GET** request with the following URL:

`http://notifier:4201/notificationservice/notifications/ext/active/{{{notificationId}}}?notificationSource={{{notificationSource}}}`

---------

![api_old_get_all](/docs/graphics/api_old_get_one.png)

The **deprecated** API call also works. Therefore only the parameter "notificationSource" is necessary.

![flow_get_one_old](/docs/graphics/flow_get_one_old.png)

In the http node configure a **GET** request with the following URL:

`http://notifier:4201/notificationservice/notifications/{{{notificationId}}}`

---------

To get the defined notification via these Flow Creator nodes, just trigger the inject node.

=========> Screenhot missing !!!

## Accept one notification

![api_accept](/docs/graphics/api_accept.png)

It is possible to accept an active notification. Therefore the parameter "notificationId", "userId" and "notificationSource" are necessary.

![flow_accept](/docs/graphics/flow_accept.png)

The function "set params" sets the mandatory parameter, which are later used in the URL of the http request:

```javascript
msg.notificationId = {}
msg.userId = {}
msg.notificationSource = {}
msg.notificationId = "14";
msg.userId = "user@siemens.com"
msg.notificationSource = "CustomApp";
return msg;
```

In the http node configure a **PUT** request with the following URL:

`http://notifier:4201/notificationservice/notifications/{{{notificationId}}}/ext/accept?userId={{{userId}}}&notificationSource={{{notificationSource}}}`

---------

To clear the defined notification via these Flow Creator nodes, just trigger the inject node.

=========> Screenhot missing !!!

## Clear one notification

![api_clear](/docs/graphics/api_clear.png)

It is possible to clear an active notification. Therefore the parameter "notificationId" is necessary.

![flow_clear](/docs/graphics/flow_clear.png)

The function "set params" sets the mandatory parameter, which is later used in the URL of the http request:

```javascript
msg.notificationId = {}
msg.notificationId = "14";
return msg;
```

In the http node configure a **PUT** request with the following URL:

`http://notifier:4201/notificationservice/notifications/{{{notificationId}}}/ext/clear`

---------

To get the defined notification via these Flow Creator nodes, just trigger the inject node.

![result_clear](/docs/graphics/result_clear.png)

## Raise one notification

![api_raise](/docs/graphics/api_raise.png)

It is possible to raise a further notification within the Flow Creator. Therefore a request body is necessary, containing "notificationTypeId", "eventText", "assetId" and "notificationSource". The new notification gets an unique notificationId for identification.

- **notificationTypeId**: 1 (alert) / 2 (warning) / 3 (information)
- **eventText**: message text (can be any string)
- **assetId**: id of asset in Data Service (looks like '549c3daa33cd4628b02c2e2745f54d80')
- **notificationSource**: who sended the notification, e.g. "CustomApp" (can be any string, but do not use blanks within)

> **AssetId:**
> To get the assetId, either look up in Data Service > select asset > copy id from URL  OR  execute a http request to GET notification and copy the assetId from the response.

![get_assetid_1](/docs/graphics/get_assetid_1.png) ![get_assetid_2](/docs/graphics/get_assetid_2.png)

---------

![flow_raise](/docs/graphics/flow_raise.png)

The function "set request body" sets the mandatory parameter within the request body for the http POST request.

```javascript
msg.payload = {}
msg.payload={
  'notificationTypeId': '3',
  'eventText': 'INFO from Flow Creator',
  'assetId': '<YourAssetId>',
  'notificationSource': 'FlowCreator'
};
return msg;
```

In the http node configure a **POST** request with the following URL:

`http://notifier:4201/notificationservice/notifications/ext/raise`

---------

To send the defined notification via these Flow Creator nodes, just trigger the inject node.

![result_raise](/docs/graphics/result_raise.png)
![result_raise2](/docs/graphics/result_raise_2.png)
