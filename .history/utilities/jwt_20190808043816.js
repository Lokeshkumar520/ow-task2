const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');
module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/user/authenticate',
            '/user/register',
            '/user/getAllDevices'
            ]
    });
}

//It is possible that some tokens will need to be revoked so they cannot be used any longer.
async function isRevoked(req, payload, done) {
   
    const user = await userService.getById(payload.sub);
   
    if(!user){
    
        return done(null, true);
    }
    // revoke token if user no longer exists
   
    done();
};