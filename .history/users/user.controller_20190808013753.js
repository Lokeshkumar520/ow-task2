const express = require('express');
const router = express.Router();
const userService = require('./user.service');
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/addDevice', addDevice);
router.post('/setDevicePowerOnOff', setDevicePowerOnOff);
router.post('/setDeviceRestart', setDeviceRestart);
router.post('/deleteDevice', deleteDevice);
router.get('/deleteAllDevices', deleteAllDevices);
router.get('/dashboard', getAllDevices);

//router.get()
module.exports = router;

//Uncomment below line to format database and re-create user and devices 

//userService._cleanDump();   

//Route to "Authenticate" service////////////////////////////////////////
function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(res.json(response))
        .catch(err => next(err));
}

//Route to "Admin Registration" service/////////////////////////////////////
function register(req, res, next) {
    console.log('request for registration');
    console.log(req.body);
    userService.create(req.body)
        .then(res.json(response))
        .catch(err => next(err));
}

//Route to "Admin Registration" service/////////////////////////////////////
function getAllDevices(req, res, next) {
    userService.getAll()
        .then(res.json(response))
        .catch(err => next(err));
}

//Route to "Add new device" service///////////////////////////////////////
function addDevice(req, res, next) {
    userService.addDevice(req.body)
        .then(res.json(response))
        .catch(err => next(err));
}

//Route to "Set Device Action Power On/Off" service///////////////////////
function setDevicePowerOnOff(req, res, next) {
    userService.setDevicePowerOnOff(req.body)
        .then(res.json(response))
        .catch(err => next(err));
}

//Route to "Set Device Action Restart" service////////////////////////////
function setDeviceRestart(req, res, next) {
    userService.setDeviceRestart(req.body)
        .then(res.json(response))
        .catch(err => next(err));
}

//Route to "Delete Device" service////////////////////////////////////////
function deleteDevice(req, res, next) {
    userService.deleteDevice(req.body)
        .then(res.json(response))
        .catch(err => next(err));
}

//Route to "Delete All Devices" service///////////////////////////////////
function deleteAllDevices(req, res, next) {
    userService.deleteAllDevices()
        .then(res.json(response))
        .catch(err => next(err));
}