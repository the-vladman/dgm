var express         = require( 'express' ),
    categories      = require( './categories' ),
    posts           = require( './posts' ),
    users           = require( './users' ),
    sessions        = require( './sessions' ),
    SessionHandler  = require( '../lib/session' ),
    cmsApi          = express.Router();

cmsApi.use( '/sessions', sessions );
cmsApi.use( '/posts', posts );

// Validate the user's session
cmsApi.use( SessionHandler.validate );

// Members only resources
cmsApi.use( '/categories', categories );
cmsApi.use( '/users', users );

module.exports  = cmsApi;