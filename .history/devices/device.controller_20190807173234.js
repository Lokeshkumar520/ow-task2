const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/dashboard', getAll);
//router.get()
module.exports = router;
userService._cleanDump();
function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(response => response ? res.json(response):res.json(response))
        .catch(err => next(err));
}

function register(req, res, next) {
    console.log('request for registration');
    console.log(req.body)
    userService.create(req.body)
        .then(result =>result ? res.json(result): res.json({status:"Failed!", message:'Failed to register user, Please try again! '}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}





