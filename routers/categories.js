var express     = require( 'express' ),
    Category    = require( '../models/category' ),
    Utils       = require( '../lib/utils' ),
    Session     = require( '../lib/session' ),
    router      = express.Router(),
    _getRefs    = function () {
        return [
            {
                field   : 'section',
                select  : 'name slug type'
            }
        ];
    };

router.get( '', function ( req, res, next ) {
    var filters = [ 'name', 'section', 'slug', 'type' ];

    Utils.paginate( Category, filters, _getRefs(), req, res, next );
});

router.get( '/:id', function ( req, res, next ) {
    var cursor      = Category.findById( req.params.id ),
        callback    = function ( err, category ) {
            if ( err || !category ) {
                err         = new Error( 'Invalid category id' );
                err.status  = 404;
                next( err );
            } else {
                res.json( category );
            }
        };

    if ( req.query.expanded && req.query.expanded === 'true' ) {
        var refs    = _getRefs();
        for ( var i = 0; i < refs.length; i++ ) {
            cursor.populate( refs[i].field, refs[i].select );
        }

        cursor.exec( callback );
    } else {
        cursor.exec( callback )
    }
});

router.post( '/', Session.validate, function ( req, res, next ) {
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

router.put( '/:id', Session.validate, function ( req, res, next ) {
    var updated     = function ( err, category ) {
            res.json( category );
        };

    Category.findById( req.params.id, function ( err, category ) {
        if ( err || !category ) {
            err         = new Error( 'Invalid category id' );
            err.status  = 404;
            next( err );
        } else {
            for ( var key in req.body ) {
                category[key]   = req.body[key];
            }

            category.save( updated );
        }
    });
});

router.delete( '/:id', Session.validate, function ( req, res, next ) {
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