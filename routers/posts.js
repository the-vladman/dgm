var express     = require( 'express' ),
    fs          = require( 'fs' ),
    path        = require( 'path' ),
    rimraf      = require( 'rimraf' ),
    config      = require( '../config/app' ),
    Post        = require( '../models/post' ),
    Session     = require( '../lib/session' ),
    Utils       = require( '../lib/utils' ),
    router      = express.Router(),
    _getRefs    = function () {
        return [
            {
                field   : 'category',
                select  : 'name slug'
            },
            {
                field   : 'created_by',
                select  : 'avatar name email'
            },
            {
                field   : 'edited_by',
                select  : 'avatar name email'
            },
            {
                field   : 'published_by',
                select  : 'avatar name email'
            },
            {
                field   : 'section',
                select  : 'name slug'
            },
            {
                field   : 'tag',
                select  : 'name slug'
            }
        ];
    };

router.get( '', function ( req, res, next ) {
    var filters = [ 'author', 'category', 'created_by', 'creation_date', 'edited_by', 'edition_date', 'published_by', 'published_date', 'section', 'status', 'tag' ];

    Utils.paginate( Post, filters, _getRefs(), req, res, next );
});

router.get( '/:id', function ( req, res, next ) {
    var cursor      = Post.findById( req.params.id ),
        callback    = function ( err, post ) {
            if ( err || !post ) {
                err         = new Error( 'Invalid post id' );
                err.status  = 404;
                next( err );
            } else {
                res.json( post );
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
    if ( req.uploading ) {
        Utils.upload( req, req.body.file, path.join( config.uploads_tmp_path ), function ( e, file ) {
            if ( e ) {
                next( e );
            } else {
                res.json( file );
            }
        });
    } else {
        if ( req.session.access_level == 3 && req.body.status != 'DRAFT' ) {
            var err     = new Error( 'Permission denied' );
            err.status  = 401;
            next( err );
        } else {
            Post.create({
                author          : req.body.author,
                category        : req.body.category,
                content         : req.body.content,
                created_by      : req.body.created_by,
                creation_date   : req.body.creation_date,
                datasets        : req.body.datasets,
                edited_by       : req.body.edited_by,
                edition_date    : req.body.edition_date,
                name            : req.body.name,
                published_by    : req.body.published_by,
                published_date  : req.body.published_date,
                section         : req.body.section,
                slug            : req.body.slug,
                status          : req.body.status,
                tag             : req.body.tag
            }, function ( err, post ) {
                if ( err || !post ) {
                    err         = new Error( 'Invalid post data' );
                    err.status  = 403;
                    next( err );
                } else {
                    if ( req.body.cover_photo ) {
                        Utils.move( req.body.cover_photo, path.join( config.uploads_path, post.id ), function ( e, file ) {
                            post.cover_photo    = file;
                            post.save();
                            res.json( post );
                        });
                    } else {
                        res.json( post );
                    }
                }
            });
        }
    }
});

router.put( '/:id', Session.validate, function ( req, res, next ) {
    var cover       = false,
        moveCover   = function ( post ) {
            Utils.move( req.body.cover_photo, path.join( config.uploads_path, post.id ), function ( e, file ) {
                post.cover_photo    = file;
                post.save( updated );
            });
        },
        updated     = function ( err, post ) {
            res.json( post );
        };

    Post.findById( req.params.id, function ( err, post ) {
        if ( err || !post ) {
            err         = new Error( 'Invalid post id' );
            err.status  = 404;
            next( err );
        } else {
            for ( var key in req.body ) {
                if ( req.session.access_level == 3 ) {
                    if ( key == 'edited_by' || key == 'edition_date' || key == 'published_by' || key == 'published_date' || key == 'status' )
                        continue;
                }

                if ( key == 'cover_photo' ) {
                    cover   = true;
                    continue;
                }

                post[key]   = req.body[key];
            }

            if ( cover ) {
                if ( post.cover_photo ) {
                    fs.unlink( post.cover_photo.path, function () {
                        moveCover( post );
                    });
                } else {
                    moveCover( post );
                }
            } else {
                post.save( updated );
            }
        }
    });
});

router.delete( '/:id', Session.validate, function ( req, res, next ) {
    if ( req.session.access_level > 2 ) {
        var err     = new Error( 'Permission denied' );
        err.status  = 401;
        next( err );
    } else {
        var removed = function ( err, post ) {
            res.json( post );
        };

        Post.findById( req.params.id, function ( err, post ) {
            if ( err || !post ) {
                err         = new Error( 'Invalid post id' );
                err.status  = 404;
                next( err );
            } else {
                rimraf( path.join( config.uploads_path, post.id ), function () {
                    post.remove( removed );
                });
            }
        });
    }
});

module.exports  = router;