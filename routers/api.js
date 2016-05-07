var express         = require( 'express' ),
    categories      = require( './categories' ),
    users           = require( './users' ),
    sessions        = require( './sessions' ),
    SessionHandler  = require( '../lib/session' ),
    api             = express.Router();

api.use( '/sessions', sessions );

// Validate the user's session
api.use( SessionHandler.validate );

// Members only resources
api.use( '/categories', categories );
api.use( '/users', users );

module.exports  = api;