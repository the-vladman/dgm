var express     = require( 'express' ),
    debug       = require( 'debug' )( 'app' ),
    app         = express(),
    livereload  = require( 'livereload' ),
    start       = require( './lib/start' );

// Set the PORT and ENV variables and start the server
app.set( 'port', process.env.PORT || 3000 );
app.set( 'env', process.env.ENV || 'development' );
app.settings.env    = app.get( 'env' );

start.launch( app );

// Set the CMS server routes
var api         = require( './routers/api' ),
    front       = require( './routers/front' );

app.use( '/api', api );
app.use( '/', front );

if ( app.get( 'env' ) == 'development' ) {
    var liveServer  = livereload.createServer();
    liveServer.watch( __dirname + '/public' );
}

var server      = app.listen( app.get('port'), function() {
    debug( 'Express server listening on port ' + server.address().port );
});

module.exports  = app;