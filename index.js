var express     = require( 'express' ),
    debug       = require( 'debug' )( 'app' ),
    app         = express(),
    start       = require( './lib/start' );

// Set the PORT and ENV variables and start the server
app.set( 'port', process.env.PORT || 3000 );
app.set( 'env', process.env.ENV || 'development' );

start.launch( app );

// Set the CMS server routes
var front       = require( './routers/front' );

app.use( '/', front );

var server      = app.listen( app.get('port'), function() {
    debug( 'Express server listening on port ' + server.address().port );
});

module.exports  = app;