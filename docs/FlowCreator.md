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

In case of passing the defined limits of the KPI value, the custom app sends notifications to the Notifier. These notifications can also be listet in the Flow Creator by using the corresponding API request.

![flow_get_all](/docs/graphics/flow_get_all.png)

The following nodes are needed:

inject -- function -- http request -- debug

If you check the API documantation for this request, the parameter "notificationSource" is required. The function "set params" sets the mandatory parameter, which is later used in the URL of the http request:

```javascript
msg.notificationSource = {}
msg.notificationSource = "KPI calculation app";
return msg;
```

The http request node implements the corresponding Notifier API call:

![api_get_all](/docs/graphics/api_get_all.png)

Therefore you need to configure a **GET** request with the following URL:

`http://notifier:4201/notificationservice/notifications/ext/active?notificationSource={{{notificationSource}}}`

**Deprecated API request**

The deprecated API request (V1.0) also works. Therefore no parameter is necessary to send the API request.

![flow_get_all_old](/docs/graphics/flow_get_all_old.png)

The following nodes are needed:

inject -- http request -- debug

The http request node implements the corresponding Notifier API call:

![api_old_get_all](/docs/graphics/api_old_get_all.png)

Therefore you need to configure a **GET** request with the following URL:

`http://notifier:4201/notificationservice/notifications`

**Testing the API request**

To get all currently active notifications via these Flow Creator nodes, just trigger the inject node.

![flow_get_all_result](/docs/graphics/flow_get_all_result.png)

## List one notification

It is also possible to list just one specific notification which is active.

![flow_get_one](/docs/graphics/flow_get_one.png)

The following nodes are needed:

inject -- function -- http request -- debug

If you check the API documantation for this request, the parameters "notificationId" and "notificationSource" are necessary. The function "set params" sets the mandatory parameters, which are later used in the URL of the http request:

```javascript
msg.notificationId = {}
msg.notificationSource = {}
msg.notificationId = "36";
msg.notificationSource = "KPI calculation app";
return msg;
```

The http request node implements the corresponding Notifier API call:

![api_get_one](/docs/graphics/api_get_one.png)

Therefore you need to configure a **GET** request with the following URL:

`http://notifier:4201/notificationservice/notifications/ext/active/{{{notificationId}}}?notificationSource={{{notificationSource}}}`

**Deprecated API request**

The deprecated API request (V1.0) also works. Therefore only the parameter "notificationSource" is necessary.

![flow_get_one_old](/docs/graphics/flow_get_one_old.png)

The following nodes are needed:

inject -- function -- http request -- debug

The http request node implements the corresponding Notifier API call:

![api_old_get_all](/docs/graphics/api_old_get_one.png)

Therefore you need to configure a **GET** request with the following URL:

`http://notifier:4201/notificationservice/notifications/{{{notificationId}}}`

**Testing the API request**

To get the defined notification via these Flow Creator nodes, just trigger the inject node.

![flow_get_one_result](/docs/graphics/flow_get_one_result.png)

## Accept one notification

It is possible to accept an active notification.

![flow_accept](/docs/graphics/flow_accept.png)

The following nodes are needed:

inject -- function -- http request -- debug

If you check the API documantation for this request, the parameters "notificationId", "userId" and "notificationSource" are necessary. The function "set params" sets the mandatory parameters, which are later used in the URL of the http request:

```javascript
msg.notificationId = {}
msg.userId = {}
msg.notificationSource = {}
msg.notificationId = "39";
msg.userId = "test@siemens.com"
msg.notificationSource = "KPI calculation app";
return msg;
```

The http request node implements the corresponding Notifier API call:

![api_accept](/docs/graphics/api_accept.png)

Therefore you need to configure a **PUT** request with the following URL:

`http://notifier:4201/notificationservice/notifications/{{{notificationId}}}/ext/accept?userId={{{userId}}}&notificationSource={{{notificationSource}}}`

**Testing the API request**

To accept a notification via these Flow Creator nodes, just trigger the inject node.

![flow_accept_result](/docs/graphics/flow_accept_result.png)

## Clear one notification

It is possible to clear an active notification.

![flow_clear](/docs/graphics/flow_clear.png)

The following nodes are needed:

inject -- function -- http request -- debug

If you check the API documantation for this request, the parameter "notificationId" is necessary. The function "set params" sets the mandatory parameter, which is later used in the URL of the http request:

```javascript
msg.notificationId = {}
msg.notificationId = "14";
return msg;
```

The http request node implements the corresponding Notifier API call:

![api_clear](/docs/graphics/api_clear.png)

Therefore you need to configure a **PUT** request with the following URL:

`http://notifier:4201/notificationservice/notifications/{{{notificationId}}}/ext/clear`

**Testing the API request**

To clear the defined notification via these Flow Creator nodes, just trigger the inject node.

![flow_clear_result](/docs/graphics/flow_clear_result.png)

## Raise one notification

It is possible to raise a further notification within the Flow Creator. The new notification gets an unique notificationId for identification.

![flow_raise](/docs/graphics/flow_raise.png)

The following nodes are needed:

inject -- function -- http request -- debug

If you check the API documantation for this request, a **request body** is necessary, containing "notificationTypeId", "eventText", "assetId" and "notificationSource". The function "set request body" sets the mandatory parameters within the request body for the http POST request.

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

- **notificationTypeId**: 1 (alert) / 2 (warning) / 3 (information)
- **eventText**: message text (can be any string)
- **assetId**: id of asset in Data Service (looks like '549c3daa33cd4628b02c2e2745f54d80')
- **notificationSource**: who sended the notification, e.g. "KPI calculation app" (can be any string, but do not use blanks within)

> **AssetId:**
> To get the assetId, either look up in Data Service > select asset > copy id from URL  OR  execute a http request to GET notification and copy the assetId from the response.

![get_assetid_1](/docs/graphics/get_assetid_1.png) ![get_assetid_2](/docs/graphics/get_assetid_2.png)

The http request node implements the corresponding Notifier API call:

![api_raise](/docs/graphics/api_raise.png)

Therefore you need to configure a **POST** request with the following URL:

`http://notifier:4201/notificationservice/notifications/ext/raise`

**Testing the API request**

To send the defined notification via these Flow Creator nodes, just trigger the inject node.

![flow_raise_result](/docs/graphics/flow_raise_result.png)
![flow_raise_result_2](/docs/graphics/flow_raise_result_2.png)
