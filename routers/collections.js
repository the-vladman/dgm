var async               = require( 'async' ),
    express             = require( 'express' ),
    fs                  = require( 'fs' ),
    jsonfile            = require( 'jsonfile' ),
    path                = require( 'path' ),
    mkdirp              = require( 'mkdirp' ),
    config              = require( '../config/app' ),
    Category            = require( '../models/category' ),
    Post                = require( '../models/post' ),
    User                = require( '../models/user' ),
    nodeZip             = require( 'node-zip' ),
    router              = express.Router(),
    compressCategories  = function ( req, zip, cb ) {
        Category.find( function ( err, categories ) {
            if ( err || !categories ) {
                cb( true );
            } else {
                var categoriesFile  = path.join( config.uploads_tmp_path, 'categories.json' );

                jsonfile.writeFile( categoriesFile, categories, {
                    spaces  : 2
                }, function () {
                    zip.file( 'data/categories.json', fs.readFileSync( categoriesFile ) );

                    for ( var i = 0; i < categories.length; i++ ) {
                        if ( categories[i].type == 'TAG' ) {
                            if ( categories[i].cover_photo && categories[i].cover_photo.path ) {
                                zip.file( path.join( 'data/images/', categories[i].id, categories[i].cover_photo.name ), fs.readFileSync( categories[i].cover_photo.path ) );
                            }

                            if ( categories[i].grid_photo && categories[i].grid_photo.path ) {
                                zip.file( path.join( 'data/images/', categories[i].id, categories[i].grid_photo.name ), fs.readFileSync( categories[i].grid_photo.path ) );
                            }
                        }
                    }

                    cb( null, zip );
                });
            }
        });
    },
    compressPosts       = function ( req, zip, cb ) {
        Post.find( function ( err, posts ) {
            if ( err || !posts ) {
                cb( true );
            } else {
                var postsFile   = path.join( config.uploads_tmp_path, 'posts.json' );

                jsonfile.writeFile( postsFile, posts, {
                    spaces  : 2
                }, function () {
                    zip.file( 'data/posts.json', fs.readFileSync( postsFile ) );

                    for ( var i = 0; i < posts.length; i++ ) {
                        if ( posts[i].cover_photo && posts[i].cover_photo.path ) {
                            zip.file( path.join( 'data/images/', posts[i].id, posts[i].cover_photo.name ), fs.readFileSync( posts[i].cover_photo.path ) );
                        }

                        if ( posts[i].grid_photo && posts[i].grid_photo.path ) {
                            zip.file( path.join( 'data/images/', posts[i].id, posts[i].grid_photo.name ), fs.readFileSync( posts[i].grid_photo.path ) );
                        }
                    }

                    cb( null, zip );
                });
            }
        });
    },
    compressUsers       = function ( req, zip, cb ) {
        User.find( function ( err, users ) {
            if ( err || !users ) {
                cb( true );
            } else {
                var usersFile   = path.join( config.uploads_tmp_path, 'users.json' );

                jsonfile.writeFile( usersFile, users, {
                    spaces  : 2
                }, function () {
                    zip.file( 'data/users.json', fs.readFileSync( usersFile ) );

                    cb( null, zip );
                });
            }
        });
    },
    loadCategories      = function ( req, zip, cb ) {
        var categories  = JSON.parse( zip.files[ 'data/categories.json' ]._data ),
            ids         = Array(),
            photos      = Array();

        for ( var i = 0; i < categories.length; i++ ) {
            ids.push({
                original    : categories[i]._id
            });

            photos.push({
                cover_photo : categories[i].cover_photo,
                grid_photo  : categories[i].grid_photo
            });

            delete categories[i]._id;
            delete categories[i].cover_photo;
            delete categories[i].grid_photo;
        }

        Category.create( categories, function ( err, records ) {
            if ( err ) {
                err         = new Error( 'Invalid categories data' );
                err.status  = 403;

                cb( err );
            } else {
                for ( var i = 0; i < records.length; i++ ) {
                    ids[i].created  = records[i].id;
                }

                var i = 0;
                async.each( records, function ( category, done ) {
                    if ( category.type == 'TAG' ) {
                        var dir     = path.join( config.uploads_path, category.id );
                        mkdirp.sync( dir );

                        if ( photos[i].cover_photo != undefined ) {
                            fs.writeFileSync( path.join( dir, photos[i].cover_photo.name ), zip.files['data/images/' + ids[i].original + '/' + photos[i].cover_photo.name]._data, 'binary' );
                            category.cover_photo    = {
                                path    : path.join( dir, photos[i].cover_photo.name ),
                                name    : photos[i].cover_photo.name
                            };
                        }

                        if ( photos[i].grid_photo != undefined ) {
                            fs.writeFileSync( path.join( dir, photos[i].grid_photo.name ), zip.files['data/images/' + ids[i].original + '/' + photos[i].grid_photo.name]._data, 'binary' );
                            category.grid_photo     = {
                                path    : path.join( dir, photos[i].grid_photo.name ),
                                name    : photos[i].grid_photo.name
                            };
                        }

                        category.save( function () {
                            i++;
                            done( null );
                        });
                    } else {
                        i++;
                        done( null );
                    }
                }, function ( err ) {
                    cb( null, ids );
                });
            }
        });
    },
    loadPosts           = function ( req, zip, usersIds, categoriesIds, cb ) {
        var posts       = JSON.parse( zip.files[ 'data/posts.json' ]._data ),
            ids         = Array(),
            photos      = Array();

        for ( var i = 0; i < posts.length; i++ ) {
            var author      = false,
                category    = false,
                editor      = false,
                publisher   = false,
                section     = false,
                tag         = false;

            ids.push( posts[i]._id );
            photos.push({
                cover_photo : posts[i].cover_photo,
                grid_photo  : posts[i].grid_photo
            });

            delete posts[i]._id;
            delete posts[i].cover_photo;
            delete posts[i].grid_photo;

            for ( var j = 0; j < usersIds.length; j++ ) {
                if ( !author && ( posts[i].created_by && posts[i].created_by == usersIds[j].original ) ) {
                    posts[i].created_by     = usersIds[j].created;
                    author                  = true;
                }

                if ( !editor && ( posts[i].edited_by && posts[i].edited_by == usersIds[j].original ) ) {
                    posts[i].edited_by      = usersIds[j].created;
                    editor                  = true;
                }

                if ( !publisher && ( posts[i].published_by && posts[i].published_by == usersIds[j].original ) ) {
                    posts[i].published_by   = usersIds[j].created;
                    publisher               = true;
                }

                if ( author && editor && publisher ) {
                    break;
                }
            }

            for ( var j = 0; j < categoriesIds.length; j++ ) {
                if ( !category && posts[i].category == categoriesIds[j].original ) {
                    posts[i].category   = categoriesIds[j].created;
                    category            = true;
                }

                if ( !section && posts[i].section == categoriesIds[j].original ) {
                    posts[i].section    = categoriesIds[j].created;
                    section             = true;
                }

                if ( !tag && posts[i].tag == categoriesIds[j].original ) {
                    posts[i].tag        = categoriesIds[j].created;
                    tag                 = true;
                }

                if ( category && section && tag ) {
                    break;
                }
            }
        }

        Post.create( posts, function ( err, records ) {
            if ( err ) {
                err         = new Error( 'Invalid posts data' );
                err.status  = 403;

                cb( err );
            } else {
                var i = 0;
                async.each( records, function ( post, done ) {
                    var dir         = path.join( config.uploads_path, post.id );

                    mkdirp.sync( dir );

                    if ( photos[i].cover_photo != undefined ) {
                        fs.writeFileSync( path.join( dir, photos[i].cover_photo.name ), zip.files['data/images/' + ids[i] + '/' + photos[i].cover_photo.name]._data, 'binary' );
                        post.cover_photo    = {
                            path    : path.join( dir, photos[i].cover_photo.name ),
                            name    : photos[i].cover_photo.name
                        };
                    }

                    if ( photos[i].grid_photo != undefined ) {
                        fs.writeFileSync( path.join( dir, photos[i].grid_photo.name ), zip.files['data/images/' + ids[i] + '/' + photos[i].grid_photo.name]._data, 'binary' );
                        post.grid_photo     = {
                            path    : path.join( dir, photos[i].grid_photo.name ),
                            name    : photos[i].grid_photo.name
                        };
                    }

                    post.save( function () {
                        i++;
                        done( null );
                    });
                }, function ( err ) {
                    cb( null );
                });
            }
        });
    },
    loadUsers           = function ( req, zip, cb ) {
        var users       = JSON.parse( zip.files[ 'data/users.json' ]._data ),
            ids         = Array();

        for ( var i = 0; i < users.length; i++ ) {
            ids.push({
                original    : users[i]._id
            });
            delete users[i]._id;
        }

        User.create( users, function ( err, records ) {
            if ( err ) {
                err         = new Error( 'Invalid users data' );
                err.status  = 403;

                cb( err );
            } else {
                for ( var i = 0; i < records.length; i++ ) {
                    ids[i].created  = records[i].id;
                }

                cb( null, ids );
            }
        });
    };

router.get( '/', function ( req, res, next ) {
    var zip     = new nodeZip();

    async.waterfall([
        function ( cb ) {
            compressCategories( req, zip, function ( err, zip ) {
                if ( err ) {
                    cb( true );
                } else {
                    cb( null, zip );
                }
            });
        },
        function ( zip, cb ) {
            compressPosts( req, zip, function ( err, zip ) {
                if ( err ) {
                    cb( true );
                } else {
                    cb( null, zip );
                }
            });
        },
        function ( zip, cb ) {
            compressUsers( req, zip, function ( err, zip ) {
                if ( err ) {
                    cb( true );
                } else {
                    cb( null, zip );
                }
            });
        }
    ], function ( err, zip ) {
        if ( err ) {
            err         = new Error( 'Invalid query' );
            err.status  = 401;

            cb( err );
        } else {
            var zipFile     = path.join( config.uploads_tmp_path, 'data.zip' );

            fs.writeFileSync( zipFile, zip.generate({
                base64      : false,
                compression : 'DEFLATE'
            }), 'binary' );

            var filename    = path.basename( zipFile ),
                stats       = fs.statSync( zipFile );

            res.setHeader( 'Content-Disposition', 'attachment; filename=' + filename );
            res.setHeader( 'Content-Length', stats.size );
            res.setHeader( 'Content-Type', 'application/zip' );

            var filestream  = fs.createReadStream( zipFile );
            filestream.pipe( res );
        }
    });
});

router.post( '/', function ( req, res, next ) {
    if ( !req.uploading || !req.body.files.data ) {
        var err     = new Error( 'Invalid request' );
        err.status  = 400;

        next( err );
    } else {
        var zipFile = fs.readFileSync( req.body.files.data[0].path ),
            zip     = new nodeZip( zipFile, {
                base64      : false,
                checkCRC32  : true
            });

        async.waterfall([
            function ( cb ) {
                loadUsers( req, zip, function ( err, usersIds ) {
                    if ( err ) {
                        cb( err );
                    } else {
                        cb( null, usersIds );
                    }
                });
            },
            function ( usersIds, cb ) {
                loadCategories( req, zip, function ( err, categoriesIds ) {
                    if ( err ) {
                        cb( err );
                    } else {
                        cb( null, usersIds, categoriesIds );
                    }
                });
            },
            function ( usersIds, categoriesIds, cb ) {
                loadPosts( req, zip, usersIds, categoriesIds, function ( err ) {
                    if ( err ) {
                        cb( err );
                    } else {
                        cb();
                    }
                });
            }
        ], function ( err, result ) {
            if ( err ) {
                next( err );
            } else {
                res.json({
                    message : 'Import complete'
                });
            }
        });
    }
});

module.exports  = router;