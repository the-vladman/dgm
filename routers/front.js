var express     = require( 'express' ),
    router      = express.Router();

router.get( '/', function ( req, res ) {
    res.render( 'home' );
});

router.get( '/partials/:module/:view', function ( req, res ) {
    res.render( 'partials/' + req.params.module + '/' + req.params.view );
});

router.get( '*', function ( req, res ) {
    res.render( 'home' );
});

module.exports  = router;