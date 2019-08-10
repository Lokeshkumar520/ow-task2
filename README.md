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
                # method: POST
                # URL: http://localhost:4000/user/register
                # Headder Content-type : application/json
                #  Body:raw -JSON(application/json)
                #  {
                # "username": "Your username here",
                #  "firstName": "Your first name here",
                # "lastName": "Your last name here",
                #  "gender": "Your gender here",
                #  "password": "Your password here",
                #  "method": "POST"
                #  } 
          # Response: if there is no Registered Admin in database, A new admin can be registered successfully.  
            #      @On Success:
            #      {
            #     "status": "Success",
            #     "message": "Registered Admin"
            #      }



