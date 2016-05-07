var express     = require( 'express' ),
    Category    = require( '../models/category' ),
    Utils       = require( '../lib/utils' ),
    router      = express.Router();

router.get( '', function ( req, res, next ) {
    var filters = [ 'section', 'type' ],
        refs    = [
            {
                field   : 'section',
                select  : 'name slug type'
            }
        ];

    Utils.paginate( Category, filters, refs, req, res, next );
});

router.post( '/', function ( req, res, next ) {
    if ( req.session.access_level > 2 ) {
        var err     = new Error( 'Permission denied' );
        err.status  = 401;
        next( err );
    } else {
        Category.create({
            name    : req.body.name,
            section : req.body.section,
            slug    : req.body.slug,
            type    : req.body.type
        }, function ( err, category ) {
            if ( err || !category ) {
                err         = new Error( 'Invalid category data' );
                err.status  = 403;
                next( err );
            } else {
                res.json( category );
            }
        });
    }
});

router.delete( '/:id', function ( req, res, next ) {
    if ( req.session.access_level > 2 ) {
        var err     = new Error( 'Permission denied' );
        err.status  = 401;
        next( err );
    } else {
        var removed = function ( err, category ) {
            res.json( category );
        };

        Category.findById( req.params.id, function ( err, category ) {
            if ( err || !category ) {
                err         = new Error( 'Invalid category id' );
                err.status  = 404;
                next( err );
            } else {
                category.remove( removed );
            }
        });
    }
});

module.exports  = router;