function specData(){
return {
    "openapi": "3.0.1",
    "info": {
      "description": "Description of the REST API of the Notification Service.",
      "version": "1.2.0",
      "title": "Notifier Open API Definition"
    },
    "servers": [
      {
        "url": "https://{ip}:{port}/notifier/NotificationService/",
        "description": "Notifier on Edge",
        "variables": {
          "ip": {
            "default": "localhost"
          },
          "port": {
            "default": "4201"
          }
        }
      }
    ],
    "tags": [
      {
        "name": "Notifications"
      },
      {
        "name": "Notifications [Deprecated APIs]"
      }
    ],
    "paths": {
      "/Notifications/ext/raise": {
        "post": {
          "tags": [
            "Notifications"
          ],
          "summary": "Raises an ActiveNotification.",
          "description": "Raise an ActiveNotification. A raised ActiveNotification indicates that a specific raise condition became active. It needs an explicit call of clear to indicate that the raise condition is no longer active.The unique identification of the notification is notification Id and it is mapped strictly with the client of the calling __operatortenant-applicationname__.", 
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ActiveNotificationRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ActiveNotificationResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request\n<table>\n  <thead>\n    <th>errorKey</th>\n    <th>message</th>\n  </thead>\n  <tr>\n    <td>AssetNotFound</td>\n    <td>Asset is not found for the passed tenant.</td>\n  </tr>\n  <tr>\n    <td>Event_Text_Too_Long</td>\n    <td>Text to display for event is too long, supported length is 255 characters.</td>\n  </tr>\n <tr>\n    <td>Wrong_NotificationType </td>\n      <td> NotificateTypeId should belong to Info, Warning or Alert. </td>\n  </tr>\n <tr>\n    <td>Notifier_UnAvailable</td>\n    <td>Tenant passed either has not bought Notifier or it's user never logged in to the notifier..</td>\n  </tr>\n <tr>\n    <td>Request_Not_Supported</td>\n    <td>Request Not supported for this Platform.</td>\n  </tr>\n <tr>\n    <td>MissingParameter</td>\n    <td>This error will come if any of the required field is missing in body.</td>\n  </tr>\n</table>           \n",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorBase"
                  }
                }
              }
            }
          }
        }
      },
      "/Notifications/{notificationId}/ext/clear": {
        "put": {
          "tags": [
            "Notifications"
          ],
          "summary": "Clears an ActiveNotification.",
          "description": "Clearing a raised ActiveNotification, indicates that its raise condition is no longer true. If the ActiveNotification Id is not avaialbe then the call fails. Even if the notification id is there and client id is changed from what notification id was created the call fails. From the client __opeatorname-applicationname__ is take for notification security",
          "parameters": [
            {
              "name": "notificationId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Notification id generated during the raise of the notification"
            }
          ],
         
          "responses": {
            "200": {
              "description": "Success"
            },
            "400": {
              "description": "Bad Request\n<table>\n  <thead>\n    <th>errorKey</th>\n    <th>message</th>\n  </thead>\n  <tr>\n    <td>NotificationId_NotFound</td>\n    <td>Notification Id is not valid for tenant either client id or notification id needs to be checked.</td>\n  </tr>\n  <tr>\n    <td>Notifier_UnAvailable</td>\n    <td>  Tenant passed either has not bought Notifier or it's user never logged in to the notifier..</td>\n  </tr>\n <tr>\n    <td>Request_Not_Supported</td>\n    <td>Request Not supported for this Platform.</td>\n  </tr>\n<tr>\n    <td>MissingParameter</td>\n    <td>This error will come if any of the required field is missing in body.</td>\n  </tr>\n<tr>\n    <td>NotificationService_Notifcation_Cleared_already</td>\n    <td>This Error will come if notification is already cleared</td>\n  </tr>\n<tr>\n    <td>NotificationService_Notifcation_Not_raised</td>\n    <td>This Error will come if notification is not raised</td>\n  </tr>\n</table>           \n",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ClearErrorBase"
                  }
                }
              }
            }
          }
        }
      },
      "/Notifications/ext/active": {
        "get": {
          "tags": [
            "Notifications"
          ],
          "summary": "Get active list of notification",
          "description": "Get list of Active Notification and if user has set any filter then user will get the filtered notification",
          "parameters": [
            {
              "name": "userFilter",
              "in": "query",
              "required": false,
              "schema": {
                "type": "boolean"
              },
              "description": "If the user has set any filter in Notifier then they can pass true here to get filtered List of active notifications"
            },
            {
              "name": "userId",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "User has to pass email Id if they have set the userFilter as true"
            },
            {
              "name": "notificationSource",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "User has to pass the <b>notificationSource</b> same name they would have passed while rasing the notification"
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request\n<table>\n  <thead>\n    <th>errorKey</th>\n    <th>message</th>\n  </thead>\n<tr>\n    <td>MissingParameter</td>\n    <td>This error will come if any of the required field is missing in body.</td>\n  </tr>\n</table>\n",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MissingErrorBase"
                  }
                }
              }
            }
          }
        }
      },
      "/Notifications/ext/active/{notificationId}": {
        "get": {
          "tags": [
            "Notifications"
          ],
          "summary": "Get an Active  Notification by notification id",
          "description": "Get The Active Notification Based On Notification Id",
          "parameters": [
            {
              "name": "notificationId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "User has to pass the notification Id"
            },
            {
              "name": "notificationSource",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "User has to pass the notificationSource"
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request\n<table>\n  <thead>\n    <th>errorKey</th>\n    <th>message</th>\n  </thead>\n<tr>\n    <td>MissingParameter</td>\n    <td>This error will come if any of the required field is missing in body.</td>\n  </tr>\n</table>\n",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MissingErrorBase"
                  }
                }
              }
            }
          }
        }
      },
      "/Notifications/{notificationId}/ext/accept": {
        "put": {
          "tags": [
            "Notifications"
          ],
          "summary": "Accept an ActiveNotification.",
          "description": "A Notification (Alert, Warning and Information) which is raised can be accepted using this API. ",
          "parameters": [
            {
              "name": "notificationId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Notification id generated during the raise of the notification"
            },
            {
              "name": "userId",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Email id of the User"
            },
            {
              "name": "notificationSource",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Application name who raised the Notification"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "acceptTime": {
                      "type": "string",
                      "example": "2021-07-29T10:20:55.864Z"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request\n<table>\n  <thead>\n    <th>errorKey</th>\n    <th>message</th>\n  </thead>\n<tr>\n    <td>MissingParameter</td>\n    <td>This error will come if any of the required field is missing in body.</td>\n  </tr>\n<tr>\n    <td>NotificationService_Notifcation_Accepted_already</td>\n    <td>This Error will come if notification is already accepted</td>\n  </tr>\n<tr>\n    <td>NotificationService_Notifcation_Not_raised</td>\n    <td>This Error will come if notification is not raised</td>\n  </tr>\n</table>           \n",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ClearErrorBase"
                  }
                }
              }
            }
          }
        }
      },
      "/Notifications": {
        "get": {
          "tags": [
            "Notifications [Deprecated APIs]"
          ],
          "summary": "Get the list of ActiveNotifications.",
          "parameters": [
            {
              "name": "filter",
              "in": "query",
              "schema": {
                "type": "string"
              },
              "description": "Specifies filtering of the returned elements. The filter has to be specified as JSON array of FilterElements (see Models)."
            },
            {
              "name": "lastDeltaId",
              "in": "query",
              "schema": {
                "type": "string"
              },
              "description": "Here the client can specify the lastDeltaId it has got in a previous call of this method. It get only changes occurred since the last query. In this case response includes both active and cleared notifications. Cleared notifications can be identified by using raisedState=false"
            },
            {
              "name": "userFilter",
              "in": "query",
              "schema": {
                "type": "string"
              },
              "description": "Specifies if the notifications to be obtained will be all or those set in the user in his filter. By default true, if the parameter is not setted."
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "notifications": {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/ActiveNotification"
                        }
                      },
                      "lastDeltaId": {
                        "description": "This value can be used in a subsequent call to this method to be able to query only changes occurred in the meanwhile (deltas). Specify this value as query parameter \"lastDeltaId\".",
                        "type": "string",
                        "example": "1234567890"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/Notifications/{notificationId}": {
        "get": {
          "tags": [
            "Notifications [Deprecated APIs]"
          ],
          "summary": "Get one ActiveNotification.",
          "parameters": [
            {
              "name": "notificationId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ActiveNotification"
                  }
                }
              }
            }
          }
        }
      },
      "/Notifications/raise": {
        "post": {
          "tags": [
            "Notifications [Deprecated APIs]"
          ],
          "summary": "Raise an ActiveNotification.",
          "description": "Raise an ActiveNotification. A raised ActiveNotification indicates that a specific raise condition became active. It needs an explicit call of clear to indicate that the raise condition is no longer active. If the ActiveNotification is already in the raised state the call fails.",
          "parameters": [
            {
              "name": "X-XSRF-TOKEN",
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ActiveNotification"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ActiveNotification"
                  }
                }
              }
            }
          }
        }
      },
      "/Notifications/{notificationId}/clear": {
        "put": {
          "tags": [
            "Notifications [Deprecated APIs]"
          ],
          "summary": "Clear an ActiveNotification.",
          "description": "Clear a raised ActiveNotification. Clearing a raised ActiveNotification indicates that its raise condition is no longer true. If the ActiveNotification is currently not raised the call fails.",
          "parameters": [
            {
              "name": "notificationId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "clearTime",
              "in": "query",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "The timestamp when the raise condition became normal again. This can be for example the timestamp of the first TimeSeries value which does not violate a limit anymore. If not specified the system uses the current time as clearTime automatically."
            },
            {
              "name": "X-XSRF-TOKEN",
              "in": "header",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "NotificationType": {
          "type": "object",
          "properties": {
            "notificationTypeId": {
              "description": "Id of the NotificationType.",
              "type": "string",
              "example": "1",
              "readOnly": true
            },
            "name": {
              "description": "Name of the NotificationType.",
              "type": "string",
              "example": "Alert"
            }
          }
        },
        "ErrorBase": {
          "type": "object",
          "properties": {
            "service": {
              "description": "Gives the details of service in which error occurred",
              "type": "string",
              "example": "NotificationService"
            },
            "state": {
              "description": "Http status code",
              "type": "number",
              "example": 400
            },
            "stateText": {
              "description": "Gives the details of Http Error",
              "type": "string",
              "example": "BadRequest"
            },
            "errorKey": {
              "description": "Gives the details of error",
              "type": "string",
              "example": "Wrong_NotificationType"
            },
            "errorParams": {
              "description": "Gives the details of what is missing",
              "type": "object",
              "example": {
                "what": "Wrong_NotificationType"
              }
            },
            "message": {
              "description": "Gives details about which mandatory parameter is missing",
              "type": "string",
              "example": "NotificateTypeId should belong to Info-3, Warning-2 or Alert-1."
            }
          }
        },
        "ClearErrorBase": {
          "type": "object",
          "properties": {
            "service": {
              "description": "Gives the details of service in which error occurred",
              "type": "string",
              "example": "NotificationService"
            },
            "state": {
              "description": "Http status code",
              "type": "number",
              "example": 400
            },
            "stateText": {
              "description": "Gives the details of Http Error",
              "type": "string",
              "example": "BadRequest"
            },
            "errorKey": {
              "description": "Gives the details of error",
              "type": "string",
              "example": "NotificationId_NotFound"
            },
            "errorParams": {
              "description": "Gives the details of what is missing",
              "type": "object",
              "example": {
                "what": "NotificationId_NotFound"
              }
            },
            "message": {
              "description": "Gives details about which mandatory parameter is missing",
              "type": "string",
              "example": "Notification Id is not valid for tenant either client id or notification id needs to be checked."
            }
          }
        },
        "MissingErrorBase": {
          "type": "object",
          "properties": {
            "service": {
              "description": "Gives the details of service in which error occurred",
              "type": "string",
              "example": "NotificationService"
            },
            "state": {
              "description": "Http status code",
              "type": "number",
              "example": 400
            },
            "stateText": {
              "description": "Gives the details of Http Error",
              "type": "string",
              "example": "BadRequest"
            },
            "errorKey": {
              "description": "Gives the details of error",
              "type": "string",
              "example": "MissingParameter"
            },
            "errorParams": {
              "description": "Gives the details of what is missing",
              "type": "object",
              "example": {
                "what": "notificationSource"
              }
            },
            "message": {
              "description": "Gives details about which mandatory parameter is missing",
              "type": "string",
              "example": "Parameter notificationSource is missing.."
            }
          }
        },
        "ActiveNotificationRequest": {
          "type": "object",
          "properties": {
            "notificationTypeId": {
              "description": "Id of the NotificationType of Notification. Default NotificationTypes are Alert-1, Warning-2 and Information-3. Other then 1,2,3 in notificationTypeId is not supported",
              "type": "string",
              "example": 1
            },
            "eventText": {
              "description": "Main description text of the Notification. User can pass the description in string format",
              "type": "string",
              "example": "Message"
            },
            "assetId": {
              "description": "The Asset this Notification is related to.",
              "type": "string",
              "example": "f338c4b8bd60467e9d1f8223ae8917ae"
            },
            "notificationSource": {
              "description": "The application from where the notification is being raised. This will be displayed in the notifier and should remain unique for user experience. For most application it will be in the clientId avaialble in the token.",
              "type": "string",
              "example": "Notifier"
            },
          },
          "required": [
            "notificationTypeId",
            "eventText",
            "assetId"
          ]
        },
        "ActiveNotificationResponse": {
          "type": "object",
          "properties": {
            "notificationId": {
              "description": "System generated Id of the ActiveNotification.",
              "type": "string",
              "example": "456",
              "readOnly": true
            },
            "raiseTime": {
              "description": "Time when the ActiveNotification was raised.Can not be null.",
              "type": "string",
              "format": "date-time",
              "example": "2018-03-01T12:30:00.000Z",
              "readOnly": true
            },
            "notificationTypeId": {
              "description": "Id of the NotificationType of Notification. Default NotificationTypes are Alert-1, Warning-2 and Information-3. Other then 1,2,3 in notificationTypeId is not supported",
              "type": "string",
              "example": 1
            },
            "eventText": {
              "description": "Main description text of the Notification. User can pass the description in string format",
              "type": "string",
              "example": "Message"
            },
            "assetId": {
              "description": "The Asset this Notification is related to.",
              "type": "string",
              "example": "f338c4b8bd60467e9d1f8223ae8917ae"
            },
            "notificationSource": {
              "description": "The application from where the notification is being raised. This will be displayed in the notifier and should remain unique for user experience. For most application it will be in the clientId avaialble in the token",
              "type": "string",
              "example": "Notifier"
            },
            "notificationSourceId": {
              "description": "This is the notificationSourceId which is used to store from where the notification has been raised",
              "type": "string",
              "example": "wccop-mmdemo"
            }
          }
        },
        "NotificationResponse": {
          "type": "object",
          "properties": {
            "notificationId": {
              "description": "System generated Id of the ActiveNotification.",
              "type": "string",
              "example": "456",
              "readOnly": true
            },
            "raiseTime": {
              "description": "Time when the ActiveNotification was raised.Can not be null.",
              "type": "string",
              "format": "date-time",
              "example": "2018-03-01T12:30:00.000Z",
              "readOnly": true
            },
            "clearTime": {
              "description": "Time when the ActiveNotification was cleared.",
              "type": "string",
              "format": "date-time",
              "example": "2018-03-01T12:30:00.000Z",
              "readOnly": true
            },
            "notificationTypeId": {
              "description": "Id of the NotificationType of Notification. Default NotificationTypes are Alert-1, Warning-2 and Information-3. Other then 1,2,3 in notificationTypeId is not supported",
              "type": "string",
              "example": 1
            },
            "eventText": {
              "description": "Main description text of the Notification. User can pass the description in string format",
              "type": "string",
              "example": "Message"
            },
            "raisedState": {
              "description": "State of the active notification.",
              "type": "boolean",
              "example": "true"
            },
            "acceptTime": {
              "description": "Time when notification was accepted",
              "type": "string",
              "format": "date-time",
              "example": "2018-03-01T12:30:00.000Z",
              "readOnly": true
            },
            "acceptUser": {
              "description": "Email id of the user who accepted the notification",
              "type": "string",
              "example": "test@test.com"
            },
            "acceptState": {
              "description": "State if the notification is accepted or not.",
              "type": "boolean",
              "example": "true"
            },
            "assetId": {
              "description": "The Asset this Notification is related to.",
              "type": "string",
              "example": "f338c4b8bd60467e9d1f8223ae8917ae"
            },
            "notificationSource": {
              "description": "The application from where the notification is being raised. This will be displayed in the notifier and should remain unique for user experience. For most application it will be in the clientId avaialble in the token",
              "type": "string",
              "example": "Notifier"
            },
            "notificationSourceId": {
              "description": "This is the notificationSourceId which is used to store from where the notification has been raised",
              "type": "string",
              "example": "wccop-mmdemo"
            }
          }
        },
        "ActiveNotification": {
          "type": "object",
          "properties": {
            "notificationId": {
              "description": "Id of the Notification the ActiveNotification is based on.",
              "type": "string",
              "example": "456",
              "readOnly": true
            },
            "raiseTime": {
              "description": "Time when the ActiveNotification was raised. This is the time when the notification condition became active (true). Can not be null.If not specified the system uses the current time as raiseTime automatically.",
              "type": "string",
              "format": "date-time",
              "example": "2018-03-01T12:30:00.000Z",
              "readOnly": true
            },
            "clearTime": {
              "description": "Time when the ActiveNotification was clared. This is the time when the notification condition became normal again (false). Can be null if not already cleared.",
              "type": "string",
              "format": "date-time",
              "example": null,
              "readOnly": true
            },
            "raisedState": {
              "description": "Is the notification condition currently active (raised) or not (cleared).",
              "type": "boolean",
              "example": true,
              "readOnly": true
            },
            "acceptTime": {
              "description": "Time when the ActiveNotification was accepted by a user. Can be null if not already accepted.",
              "type": "string",
              "format": "date-time",
              "example": "2018-03-01T12:35:00.000Z",
              "readOnly": true
            },
            "acceptUser": {
              "description": "The id of the user who has accepted the ActiveNotification. Can be null if not already accepted.",
              "type": "string",
              "example": "7a17362a-a6d0-4d9d-8c4e-0ef622d77427",
              "readOnly": true
            },
            "removeUser": {
              "description": "The id of the user who has removed the ActiveNotification. Can be null if not removed.",
              "type": "string",
              "example": "Shubham Rai",
              "readOnly": true
            },
            "acceptState": {
              "description": "Is the ActiveNotification accepted or not.",
              "type": "boolean",
              "example": true,
              "readOnly": true
            },
            "timeStamp": {
              "description": "The timestamp of the last state change of the ActiveNotification. This can be a change of the raisedState or the accetpState.",
              "type": "string",
              "format": "date-time",
              "example": "2018-03-01T12:35:00.000Z",
              "readOnly": true
            },
            "notificationTypeId": {
              "description": "Id of the NotificationType of Notification. Default NotificationTypes are Alert, Warning and Information. Will be set automatically by the system when the notification is raised. ",
              "type": "string",
              "example": 1
            },
            "eventText": {
              "description": "Main description text of the Notification. Will be set automatically by the system when the ActiveNotification is raised.",
              "type": "string",
              "example": "Message"
            },
            "assetId": {
              "description": "The Asset this Notification is related to. This property will be configured implicitly when configuring the NotificationProvider for the Notification (e.g. the VariableNotification).",
              "type": "string",
              "example": "f338c4b8bd60467e9d1f8223ae8917ae"
            },
            "notificationConfigurationId": {
              "description": "The ID of the configured notification.",
              "type": "string",
              "example": 1
            },
            "notificationSource": {
              "description": "The source/asset from where the notification is being raised.",
              "type": "string",
              "example": "VNP"
            }
          },
          "required": [
            "notificationTypeId",
            "eventText",
            "assetId"
          ]
        }
      }
    }
  }
}