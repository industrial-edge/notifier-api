# Using Notifier OpenAPI with Postman

- [Using Notifier OpenAPI with Postman](#using-notifier-openapi-with-postman)
  - [List all notifications](#list-all-notifications)
  - [List one notification](#list-one-notification)
  - [Accept one notification](#accept-one-notification)
  - [Clear one notification](#clear-one-notification)
  - [Raise one notification](#raise-one-notification)

Postman is an API platform Postman for using and testing APIs in a simple way. To execute the Notifier OpenAPI via Postman, it is necessary to create a header key 'Cookie' and set your current cookie string. Otherwisse the request will fail with state 401 "Unauthorized".

![postman_header](/docs/graphics/postman_header.png)

## List all notifications

![api_get_all](/docs/graphics/api_get_all.png)

With this API call you get a list of active notifications. Therefore the parameter "notificationSource" is necessary.

![postman_get_all](/docs/graphics/postman_get_all.png)

## List one notification

![api_get_one](/docs/graphics/api_get_one.png)

With this API call you get one specific notification which is active. Therefore the parameter "notificationId" and "notificationSource" are necessary.

![postman_get_one](/docs/graphics/postman_get_one.png)

## Accept one notification

![api_accept](/docs/graphics/api_accept.png)

With this API call you can accept an active notification. Therefore the parameter "notificationId", "userId" and "notificationSource" are necessary.

![postman_accept](/docs/graphics/postman_accept.png)

## Clear one notification

![api_clear](/docs/graphics/api_clear.png)

With this API call you can clear an active notification.  Therefore the parameter "notificationId" is necessary.

![postman_clear](/docs/graphics/postman_clear.png)

## Raise one notification

![api_raise](/docs/graphics/api_raise.png)

With this API call you can raise a further notification. Therefore a request body is necessary, containing "notificationTypeId", "eventText", "assetId" and "notificationSource". The new notification gets an unique notificationId for identification.

![postman_raise](/docs/graphics/postman_raise.png)
