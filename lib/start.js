var bodyParser      = require( 'body-parser' ),
    express         = require( 'express' ),
    fs              = require( 'fs' ),
    less            = require( 'less' ),
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

    // Compile frontend less styles
    var styles      = fs.readFileSync( path.join( __dirname, '../public', 'less', 'style.less' ), 'utf8' );
    less.render( styles, {
        compress    : true,
        filename    : 'style.less'
    }).then( function ( output ) {
        fs.writeFileSync( path.join( __dirname, '../public', 'css', 'style.css' ), output.css );
    });
};