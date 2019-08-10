OW-Task 2

#Description:
Which Allow to register a user as an admin who have access to add new devices into Device List and also can control Device Actions such as Power ON/OFF, Restart, and Device delete. at the client side All the actions changed by an admin can reflects in Real Time with the help of socket.io.

#Required pre-Installs 
1. Node js
2. MongoDB
3. npm
4. Postman
5. Socket.io Tester

#Usage
1. Clone this repo 
2. Run MongoDB Server (on Localhost)  *Run "mongod", (ignore if already on run)
3. Run npm install for installation of all dependencies *Run "npm install" 
4. Run npm start to start server listening on port 4000 *Run "npm start".
5. Start Postman application to call below listed APIs and get associated responses for eacg API Call.
6. Start Socket.io Tester Application to Listen all the emmited events and messages from Admin on below listed EVENTS. 

    # APIs List to test the app.
        1. Admin Registration API
               * method: POST
               * URL: http://localhost:4000/user/register
               * Headder Content-type : application/json
               * Auth: No Auth Required.
               * Body:raw -JSON(application/json)
                 {
                "username": "Your username here",
                "firstName": "Your first name here",
                "lastName": "Your last name here",
                "gender": "Your gender here",
                "password": "Your password here",
                "method": "POST"
                 } 
               * Expected Response: if there is no Registered Admin in database, A new admin can be registered successfully.  
                  @On Success:
                  {
                 "status": "Success",
                 "message": "Registered Admin"
                  }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
        2. Admin Authentication/Login API
               * method: POST
               * URL: http://localhost:4000/user/authenticate
               * Headder Content-type : application/json
               * Auth: No Auth Required.
               * Body:raw -JSON(application/json)
                 {
                "username": "Your username here",
                "password": "Your password here",
                "method": "POST"
                 } 
               * Expected Response: if there is no Registered Admin in database,then admin can be logeed in successfully.  
                  @On Success:
                  {
                   "status": "Success",
                   "message": "Successfully logged in ",
                   "token":"Your token here",
                   "profile":   {
                           "_id": "5d4bc5509e93500994ed25a0",
                           "username": "Your user name display here",
                           "firstName": "Your First name here",
                           "lastName": "Your Last name here",
                           "gender": "Your Gender Here",
                           "userRole": "Admin",
                           "updatedAt": "2019-08-08T06:46:40.177Z",
                           "createdAt": "2019-08-08T06:46:40.177Z",
                           "__v": 0
                        }
                   }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                   3. Add New Device into Device DB Collection API
               * method: POST
               * URL: http://localhost:4000/user/addDevice
               * Headder Content-type : application/json
               * Auth: Type-Bearer Token: (Header should attached with your recieved token on success of log in)
               * Body:raw -JSON(application/json)
                 {
                    "newDeviceName": "D_LINK Wifi",
                    "newDeviceActions": {
                                    "restart": "false",
                                    "powerOnOff": "false"
                            },
                    "method": "POST"
                 }
               * Expected Response: if there is no already added a device with same name, then admin can be Add a Device successfully.  
                  @On Success:
                  {
                    "status": "Success",
                    "message": "New Device Added Successfully"
                  }
                   
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        4. Get All Device List API
               * method: GET
               * URL: http://localhost:4000/user/getAllDevices
               * Headder Content-type : application/json
               * Auth: No Auth Required.
               * Body:raw -JSON(application/json)
               * Expected Response: Registered / Created Devices along with Current Action Status are listed with this API.  
                  @On Success:      
                  {
                    "status": "Success",
                    "message": "All Device Listed Successfully",
                    "deviceList": [
                        {
                            "deviceAction": {
                                "restart": false,
                                "powerOnOff": false
                            },
                            "_id": "5d4bc7229e93500994ed25a1",
                            "deviceName": "D_LINK Wifi Repeater ",
                            "updatedAt": "2019-08-08T06:54:26.249Z",
                            "createdAt": "2019-08-08T06:54:26.249Z",
                            "__v": 0,
                            "id": "5d4bc7229e93500994ed25a1"
                        },
                        {
                            "deviceAction": {
                                "restart": false,
                                "powerOnOff": false
                            },
                            "_id": "5d4bc7559e93500994ed25a2",
                            "deviceName": "D_LINK Wifi Router ",
                            "updatedAt": "2019-08-08T06:55:17.546Z",
                            "createdAt": "2019-08-08T06:55:17.546Z",
                            "__v": 0,
                            "id": "5d4bc7559e93500994ed25a2"
                        }
                    ]
                }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
        5. Set Device Power On/Off API
               * method: POST
               * URL: http://localhost:4000/user/setDevicePowerOnOff
               * Headder Content-type : application/json
               * Auth: Type-Bearer Token: (Header should attached with your recieved token on success of log in)
               * Body:raw -JSON(application/json)
                     {
                     "id": "attach device id to wich you want to change action", //(Take one _id value from recieved list of Device docs                                                                                  // on 4th API Call).   
                     "powerOnOff": true, //(you can set true or false here )
                     "method": "POST"
                     }
               * Expected Response: if  in DB there is a device associated with your attached id, then admin can be Change the Action.  
                  @On Success:
                  {
                    "status": "Success",
                    "message": "'<your Device Name will print here>'s PowerOnOff action changed"
                  }                   
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////       
          6. Set Device Restart API
               * method: POST
               * URL: http://localhost:4000/user/setDeviceRestart
               * Headder Content-type : application/json
               * Auth: Type-Bearer Token: (Header should attached with your recieved token on success of log in)
               * Body:raw -JSON(application/json)
                     {
                     "id": "attach device id to wich you want to change action", //(Take one _id value from recieved list of Device docs                                                                                  // on 4th API Call).   
                     "restart": true, //(you can set true or false here )
                     "method": "POST"
                     }
               * Expected Response: if  in DB there is a device associated with your attached id, then admin can be Change the Action.  
                  @On Success:
                  {
                    "status": "Success",
                    "message": " '<your Device Name will print here>' Device Action Changed Successfully"
                  }
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////       
          7. Device Delete API
               * method: POST
               * URL: http://localhost:4000/user/deleteDevice
               * Headder Content-type : application/json
               * Auth: Type-Bearer Token: (Header should attached with your recieved token on success of log in)
               * Body:raw -JSON(application/json)
                     {
                     "id": "attach device id to wich you want to delete", //(Take one _id value from recieved list of Device docs                                                                                  // on 4th API Call).   
                     "method": "POST"
                     }
               * Expected Response: if  in DB there is a device associated with your attached id, then admin can be delete device.  
                  @On Success:
                  {
                    "status": "Success",
                    "message": " '<your Device Name will print here>' Device deleted Successfully"
                  }   
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////       
          8. All Device Delete API
               * method: GET
               * URL: http://localhost:4000/user/deleteAllDevices
               * Headder Content-type : application/json
               * Auth: Type-Bearer Token: (Header should attached with your recieved token on success of log in)
               * Expected Response: if  in DB there is a device associated with your attached id, then admin can be delete device.  
                  @On Success:
                  {
                    "status": "Success",
                    "message": " All Device are deleted Successfully"
                  }           
          #Listen For Socket.io Client side for All events:
            URL: http://localhost:4000/
            Event names to Listen:
            1. "device_deleted"
            2. "device_Action_Restart_Changed"
            3. "device_Action_PowerOnOff_changed"
            4. "new_Device_Added"
            5. "All_devices_deleted"
