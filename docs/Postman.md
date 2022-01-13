# Using Notifier OpenAPI with Postman

- [Using Notifier OpenAPI with Postman](#using-notifier-openapi-with-postman)
  - [Raise one notification](#raise-one-notification)
  - [List all notifications](#list-all-notifications)
  - [List one notification](#list-one-notification)
  - [Accept one notification](#accept-one-notification)
  - [Clear one notification](#clear-one-notification)
  
Postman is an API platform for using and testing APIs in a simple way. To execute the Notifier OpenAPI via Postman, it is necessary to have a valid **authentication token**. This can be realized by creating a header key *Cookie* and pass the token (*authToken=<token_string>*). Otherwisse the request will fail with state **401 "Unauthorized"**. You can copy a valid authentication token from your browser cookies, when logged into the Edge device.

![postman_header](/docs/graphics/postman_header1.png)

A **postman collection**, that contains all the following requests, can be downloaded [here](/src/postman_collection.json) and imported into Postman. Before starting any request, the collection variables must be set properly. A valid authentication token is then provided automatically and set in each request header, when sending a request.

![postman_variables](/docs/graphics/postman_variables.png)

## Raise one notification

With this API call you can raise a notification. Therefore a request body is necessary, containing "notificationTypeId", "eventText", "assetId" and "notificationSource". The new notification gets an unique notificationId for identification.

- **notificationTypeId**: 1 (alert) / 2 (warning) / 3 (information)
- **eventText**: message text (can be any string)
- **assetId**: id of asset in Data Service (this is later set as 'Location' of the notification)
- **notificationSource**: who sended the notification (can be any string)

> **AssetId:**
> To get the assetId, look up in Data Service > select asset > copy id from URL.

![get_assetid_1](/docs/graphics/get_assetid_1.png)

The GET request could look like this:

`https://192.168.112.180/notifier/notificationservice/notifications/ext/raise`

The body within the Postman request can be defined as **JSON** format:

```json
{
  "notificationTypeId": "1",
  "eventText": "ALERT from Postman",
  "assetId": "549c3daa33cd4628b02c2e2745f54d80",
  "notificationSource": "Postman"
}
```

![postman_raise](/docs/graphics/postman_raise.png)

## List all notifications

With this API call you get a list of all active notifications from one source. Therefore the parameter "notificationSource" is necessary.

The GET request could look like this:

`https://192.168.112.180/notifier/notificationservice/notifications/ext/active?notificationSource=Postman`

![postman_get_all](/docs/graphics/postman_get_all.png)

## List one notification

With this API call you get one active notification from a specific source. Therefore the parameters "notificationId" and "notificationSource" are necessary.

The GET request could look like this:

`https://192.168.112.180/notifier/notificationservice/notifications/ext/active/:id?notificationSource=Postman`

![postman_get_one](/docs/graphics/postman_get_one.png)

## Accept one notification

With this API call you can accept an active notification from a specific source. Therefore the parameters "notificationId", "userId" and "notificationSource" are necessary.

The GET request could look like this:

`https://192.168.112.180/notifier/notificationservice/notifications/:id/ext/accept?userId=user@siemens.com&notificationSource=Postman`

![postman_accept](/docs/graphics/postman_accept.png)

It is important to set the parameters according to the currently active notifications. For example if "notificationSource" is set to 'PostmanX', but this special notification has 'Postman' as source, the request will fail with state 400 "Bad Request".

## Clear one notification

With this API call you can clear an active notification.  Therefore the parameter "notificationId" is necessary.

The GET request could look like this:

`https://192.168.112.180/notifier/notificationservice/notifications/:id/ext/clear`

![postman_clear](/docs/graphics/postman_clear.png)
