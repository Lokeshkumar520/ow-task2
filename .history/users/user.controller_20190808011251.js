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
router.get('/dashboard', getAll);
//router.get()
module.exports = router;

//uncomment below line to format database and re-create user and devices 
//userService._cleanDump();   
function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(res.json(response))
        .catch(err => next(err));
}

function register(req, res, next) {
    console.log('request for registration');
    console.log(req.body)
    userService.create(req.body)
        .then(res.json(response))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(res.json(response))
        .catch(err => next(err));
}

function addDevice(req,res,next){
    userService.addDevice(req.body)
    .then(res.json(response))
    .catch(err => next(err));
}


function setDevicePowerOnOff(req,res,next){
    userService.setDevicePowerOnOff(req.body)
    .then(res.json(response))
    .catch(err => next(err));
}


function setDeviceRestart(req,res,next){
    userService.setDeviceRestart(req.body)
    .then(res.json(response))
    .catch(err => next(err));
}


function deleteDevice(req,res,next){
    userService.deleteDevice(req.body)
    .then(res.json(response))
    .catch(err => next(err));
}

function deleteAllDevices(req,res,next){
    userService.deleteAllDevices()
    .then(res.json(response))
    .catch(err => next(err));
}