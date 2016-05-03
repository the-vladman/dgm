var bodyParser      = require( 'body-parser' ),
    express         = require( 'express' ),
    fs              = require( 'fs' ),
    less            = require( 'less' ),
    methodOverride  = require( 'method-override' ),
    morgan          = require( 'morgan' ),
    path            = require( 'path' ),
    watch           = require( 'node-watch' ),
    wiredep         = require( 'wiredep' );

exports.launch      = function ( app ) {
    app.use( morgan( 'dev' ) );
    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded({ extended : false }) );
    app.use( methodOverride() );
    app.use( express.static( path.join( __dirname, '../public' ) ) );

    app.set( 'views', path.join( __dirname, '../views' ) );
    app.set( 'view engine', 'jade' );

    setStyles();
    wiredep({
        exclude     : [ 'require.js' ],
        ignorePath  : '../public/',
        src         : [ './views/index.jade', './views/layout.jade' ]
    });
};

function setStyles() {
    // Compile frontend less styles
    var stylesPath      = path.join( path.join( __dirname, '../public', 'less', 'style.less' ) ),
        compile         = function () {
            var styles  = fs.readFileSync( stylesPath, 'utf8' );
            less.render( styles, {
                compress    : true,
                filename    : 'style.less',
                paths       : [ path.join( __dirname, '../public' ) ]
            }).then( function ( output ) {
                fs.writeFileSync( path.join( __dirname, '../public', 'css', 'style.css' ), output.css );
            });
        };

    watch( stylesPath, compile );
    compile();
};