# Using Notifier OpenAPI with Postman

- [Using Notifier OpenAPI with Postman](#using-notifier-openapi-with-postman)
  - [List all notifications](#list-all-notifications)
  - [List one notification](#list-one-notification)
  - [Accept one notification](#accept-one-notification)
  - [Clear one notification](#clear-one-notification)
  - [Raise one notification](#raise-one-notification)

Postman is an API platform for using and testing APIs in a simple way. To execute the Notifier OpenAPI via Postman, it is necessary to create a header key **'Cookie'** and set your current cookie string. Otherwisse the request will fail with state **401 "Unauthorized"**.

![postman_header](/docs/graphics/postman_header.png)

A **postman collection**, that contains all the following requests, can be downloaded [here](/src/postman_collection.json) and imported into Postman.

## List all notifications

With this API call you get a list of active notifications. Therefore the parameter "notificationSource" is necessary.

The GET request could look like this:

`https://192.168.112.180/notifier/notificationservice/notifications/ext/active?notificationSource=KPI calculation app`

![postman_get_all](/docs/graphics/postman_get_all.png)

## List one notification

With this API call you get one specific notification which is active. Therefore the parameter "notificationId" and "notificationSource" are necessary.

The GET request could look like this:

`https://192.168.112.180/notifier/notificationservice/notifications/ext/active/:id?notificationSource=KPI calculation app`

![postman_get_one](/docs/graphics/postman_get_one.png)

## Accept one notification

With this API call you can accept an active notification. Therefore the parameter "notificationId", "userId" and "notificationSource" are necessary.

The GET request could look like this:

`https://192.168.112.180/notifier/notificationservice/notifications/:id/ext/accept?userId=user@siemens.com&notificationSource=KPI calculation app`

![postman_accept](/docs/graphics/postman_accept.png)

It is important to set the parameter according to the currently active notifications. For example if "notificationSource" is set to 'Postman', but this special notification has 'KPI calculation app' as source, the request will fail with state 400 "Bad Request".

![postman_accept_failed](/docs/graphics/postman_accept_failed.png)

## Clear one notification

With this API call you can clear an active notification.  Therefore the parameter "notificationId" is necessary.

The GET request could look like this:

`https://192.168.112.180/notifier/notificationservice/notifications/:id/ext/clear`

![postman_clear](/docs/graphics/postman_clear.png)

## Raise one notification

With this API call you can raise a further notification. Therefore a request body is necessary, containing "notificationTypeId", "eventText", "assetId" and "notificationSource". The new notification gets an unique notificationId for identification.

- **notificationTypeId**: 1 (alert) / 2 (warning) / 3 (information)
- **eventText**: message text (can be any string)
- **assetId**: id of asset in Data Service (looks like '549c3daa33cd4628b02c2e2745f54d80')
- **notificationSource**: who sended the notification, e.g. "KPI calculation app" (can be any string, but do not use blanks within)

> **AssetId:**
> To get the assetId, either look up in Data Service > select asset > copy id from URL  OR  execute a http request to GET notification and copy the assetId from the response.

![get_assetid_1](/docs/graphics/get_assetid_1.png) ![get_assetid_2](/docs/graphics/get_assetid_2.png)

The GET request could look like this:

`https://192.168.112.180/notifier/notificationservice/notifications/ext/raise`

The body within the Postman request can be defined as **JSON** format:

![postman_raise](/docs/graphics/postman_raise.png)
