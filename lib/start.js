var bodyParser      = require( 'body-parser' ),
    express         = require( 'express' ),
    methodOverride  = require( 'method-override' ),
    morgan          = require( 'morgan' ),
    path            = require( 'path' );

exports.launch      = function ( app ) {
    app.use( morgan( 'dev' ) );
    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded({ extended : false }) );
    app.use( methodOverride() );
    app.use( express.static( path.join( __dirname, '../public' ) ) );

    app.set( 'views', path.join( __dirname, '../views' ) );
    app.set( 'view engine', 'jade' );
};