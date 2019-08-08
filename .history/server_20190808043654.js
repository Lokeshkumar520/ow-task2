/*////////////////////////////////////////////////////////////////////////
//"Title" : "Task-2";(Device Controlling using Nodejs, Socket.io, MongoDB)
//"Author": "Lokesh Kumar"  
//////////////////////////////////////////////////////////////////////////
*/
require('roothpath')();
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('utilities/jwt');
const errorHandler = require('utilities/error-handler');
const app = express();
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());
app.use('/user', require('./users/user.controller'));
app.use(errorHandler);
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = http.createServer(app);
global.io = socketio(server);
app.set('io',io);
app.use(express.static(path.join(__dirname, 'dist')));

io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
    
});

server.listen(port, function () {
    console.log('Server listening on port ' + port);
});