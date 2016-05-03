var bodyParser      = require( 'body-parser' ),
    express         = require( 'express' ),
    morgan          = require( 'morgan' ),
    path            = require( 'path' );

exports.launch      = function ( app ) {
    app.use( morgan( 'dev' ) );
    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded({ extended : false }) );
    app.use( '/public', express.static( path.join( __dirname, '../public' ) ) );

    app.set( 'views', path.join( __dirname, '../views' ) );
    app.set( 'view engine', 'jade' );
};