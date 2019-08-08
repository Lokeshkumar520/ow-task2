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
app.use('/device', require('./users/device.controller'));
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

const server = http.createServer(app);
const io = socketio(server);
app.set('io',io);
app.use(express.static(path.join(__dirname, 'dist')));
server.listen(port, function () {
    console.log('Server listening on port ' + port);
});