var express             = require( 'express' ),
    fs                  = require( 'fs' ),
    jsonfile            = require( 'jsonfile' ),
    path                = require( 'path' ),
    config              = require( '../config/app' ),
    Category            = require( '../models/category' ),
    nodeZip             = require( 'node-zip' ),
    router              = express.Router(),
    compressCategories  = function ( req, zip, cb ) {
        Category.find( function ( err, categories ) {
            if ( err || !categories ) {
                err         = new Error( 'Invalid query' );
                err.status  = 401;

                cb( err );
            } else {
                var categoriesFile  = path.join( config.uploads_tmp_path, 'categories.json' );

                jsonfile.writeFile( categoriesFile, categories, {
                    spaces  : 2
                }, function ( err ) {
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
    };

router.get( '/', function ( req, res, next ) {
    var zip     = new nodeZip();

    compressCategories( req, zip, function ( err, zip ) {
        if ( err ) {
            next( err );
        } else {
            var zipFile     = path.join( config.uploads_tmp_path, 'data.zip' );

            fs.writeFileSync( zipFile, zip.generate({
                base64      : false,
                compression : 'DEFLATE'
            }), 'binary' );

            var filename    = path.basename( zipFile );
            res.setHeader( 'Content-disposition', 'attachment; filename=' + filename );
            res.setHeader( 'Content-type', 'application/zip' );

            var filestream  = fs.createReadStream( zipFile );
            filestream.pipe( res );
        }
    });
});

module.exports  = router;