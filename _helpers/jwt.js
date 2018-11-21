const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = {
    jwt,
    getPermissions,
};

global.permissions = [];

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    global.permissions = payload.permissions;

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};

function getPermissions(){
    console.log(global.permissions);
    return global.permissions;
}