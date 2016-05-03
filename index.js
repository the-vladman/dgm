var express     = require( 'express' ),
    debug       = require( 'debug' )( 'app' ),
    app         = express();

// Set the PORT and ENV variables and start the server
app.set( 'port', process.env.PORT || 3000 );
app.set( 'env', process.env.ENV || 'development' );

var server  = app.listen( app.get('port'), function() {
    debug( 'Express server listening on port ' + server.address().port );
});

module.exports  = app;