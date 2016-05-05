var express         = require( 'express' ),
    users           = require( './users' ),
    sessions        = require( './sessions' ),
    SessionHandler  = require( '../lib/session' ),
    api             = express.Router();

api.use( '/sessions', sessions );

// Validate the user's session
api.use( SessionHandler.validate );

// Members only resources
api.use( '/users', users );

module.exports  = api;