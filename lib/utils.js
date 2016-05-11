var fs              = require( 'fs' ),
    mkdirp          = require( 'mkdirp' ),
    multiparty      = require( 'multiparty' ),
    path            = require( 'path' ),
    config          = require( '../config/app' ),
    String          = require( './string' ),
    setFilters      = function ( supported, query ) {
        var filters = {};
        for ( var i = 0; i < supported.length; i++ ) {
            var key = supported[i];
            if ( query[ key ] ) {
                switch ( key ) {
                    case 'name' :
                        filters[key]        = new RegExp( query[key], 'i' );
                        break;
                    case '$and' :
                        filters.$and        = [];
                        for ( var j = 0; j < query.$and.length; j++ ) {
                            if ( typeof query.$and[j] == 'string' ) {
                                filters.$and[j] = setFilters( supported, JSON.parse( query.$and[j] ) );
                            } else {
                                filters.$and[j] = setFilters( supported, query.$and[j] );
                            }
                        }
                        break;
                    case '$or' :
                        filters.$or         = [];
                        for ( var j = 0; j < query.$or.length; j++ ) {
                            if ( typeof query.$or[j] == 'string' ) {
                                filters.$or[j]  = setFilters( supported, JSON.parse( query.$or[j] ) );
                            } else {
                                filters.$or[j]  = setFilters( supported, query.$or[j] );
                            }
                        }
                        break;
                    case 'creation_date' :
                        if ( typeof query[key] == 'object' ) {
                            var objKey              = Object.keys( query[key] )[0];

                            filters[key]            = {};
                            filters[key][objKey]    = new Date( query[key][objKey] );
                        } else {
                            filters[key]            = query[key]
                        }
                        break;
                    case 'user' :
                        filters[key]        = new mongoose.Types.ObjectId( query[key] );
                    break;
                    default :
                        if ( Array.isArray( query[key] ) ) {
                            filters[key]    = {
                                "$in"       : query[key]
                            };
                        } else {
                            try {
                                filters[key]    = JSON.parse( query[key] );
                            } catch ( e ) {
                                filters[key]    = query[key];
                            }
                        }
                }
            }
        }

        return filters;
    };

exports.move        = function ( file, dest, cb ) {
    mkdirp( dest, function ( err, dir ) {
        if ( err ) {
            return cb( err );
        }

        var full   = path.join( dest, file.name );
        fs.rename( file.path, full, function ( err ) {
            if ( err ) {
                return cb( err );
            }

            fs.unlink( file.path, function () {
                cb( null, {
                    name    : file.name,
                    path    : full
                });
            });
        });
    });
};

exports.paginate    = function ( Model, supported, refs, req, res, next ) {
    supported.push( '$and' );
    supported.push( '$or' );

    var aggregate   = req.query.aggregate,
        filters     = setFilters( supported, req.query ),
        select      = ( req.query.select ) ? req.query.select : null,
        page        = ( req.query.page ) ? req.query.page : 1,
        pageSize    = ( req.query.per_page ) ? req.query.per_page : config.page_size,
        sort        = ( req.query.sort ) ? req.query.sort : 'name',
        order       = ( req.query.order ) ? req.query.order : 'ASC',
        obj         = {};

    obj[sort]       = ( order == 'DESC' ) ? -1 : 1;
    var options     = {
        limit       : parseInt( pageSize ),
        skip        : ( page - 1 ) * pageSize,
        sort        : obj
    };

    if ( aggregate ) {
        var field   = aggregate.substring( 0, aggregate.indexOf( ':' ) ),
            method  = aggregate.substring( aggregate.indexOf( ':' ) + 1 ),
            query   = null;

        switch ( method ) {
            default :
                query   = [
                    {
                        $match      : filters
                    },
                    {
                        $group      : {
                            _id     : '$' + method,
                            count   : {
                                $sum    : 1
                            }
                        }
                    },
                    {
                        $sort       : {
                            count   : -1
                        }
                    }
                ];
        }

        Model.aggregate( query, function ( err, results ) {
            var response    = {
                results         : results,
                pagination      : {
                    total       : results.length,
                    page        : 1,
                    per_page    : -1
                }
            };

            res.json( response );
        });
    } else {
        var cursor      = Model.find( filters, select, options ),
            callback    = function ( err, docs ) {
                Model.count( filters, function ( err, count ) {
                    var response    = {
                        results     : docs,
                        pagination  : {
                            total       : count,
                            page        : page,
                            per_page    : pageSize
                        }
                    };

                    res.json( response );
                });
            };

        if ( req.query.expanded && req.query.expanded === 'true' ) {
            if ( refs != null ) {
                for ( var i = 0; i < refs.length; i++ ) {
                    cursor.populate( refs[i].field, refs[i].select );
                }
            }

            cursor.exec( callback );
        } else {
            cursor.exec( callback )
        }
    }
};

exports.params      = function ( req, res, next ) {
    var type    = req.get( 'Content-Type' ),
        form    = new multiparty.Form({
            uploadDir   : config.uploads_tmp_path
        }),
        params  = {};

    if ( /multipart\/form-data/.test( type ) ) {
        form.parse( req, function( err, fields, files ) {
            for ( var key in fields ) {
                params[key] = fields[key][0];
            }

            params.files    = files;

            req.body        = params;
            req.uploading   = true;
            next();
        });
    } else {
        req.uploading       = false;
        next();
    }
};

exports.upload      = function ( req, field, filePath, cb ) {
    mkdirp( filePath, function( err, dir ) {
        if ( err ) {
            var error       = new Error( 'Error uploading file' );
            error.status    = 403;

            return cb( error );
        }

        var file    = req.body.files[field][0];
            ext     = /(?:\.([^.]+))?$/.exec( file.path )[1],
            name    = String.random( 16, 'alnum' ),
            full    = path.join( filePath, name + '.' + ext );

        if ( !ext ) {
            var error       = new Error( 'Invalid file name' );
            error.status    = 403;

            return cb( error );
        }

        fs.rename( file.path, full, function( err ) {
            if ( err ) {
                var error       = new Error( 'Error uploading file' );
                error.status    = 403;

                cb( error );
            } else {
                cb( null, {
                    name    : name + '.' + ext,
                    path    : full
                });
            }
        });
    });
};