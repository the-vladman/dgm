var express     = require( 'express' ),
    sessions    = require( './sessions' ),
    api         = express.Router();

api.use( '/sessions', sessions );

module.exports  = api;