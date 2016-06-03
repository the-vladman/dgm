var express         = require( 'express' ),
    categories      = require( './categories' ),
    collections     = require( './collections' ),
    posts           = require( './posts' ),
    users           = require( './users' ),
    sessions        = require( './sessions' ),
    SessionHandler  = require( '../lib/session' ),
    cmsApi          = express.Router();

cmsApi.use( '/categories', categories );
cmsApi.use( '/sessions', sessions );
cmsApi.use( '/posts', posts );

// Validate the user's session
cmsApi.use( SessionHandler.validate );

// Members only resources
cmsApi.use( '/collections', collections );
cmsApi.use( '/users', users );

module.exports  = cmsApi;