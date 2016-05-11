'use strict';

define( function () {
    return function ( $rootScope, events, Session ) {
        return {
            restrict    : 'EA',
            scope       : {
                config  : '='
            },
            templateUrl : 'partials/common/fileuploader.jade',
            link        : function ( scope, element ) {
                var uploadForm          = $( element ),
                    addHandler          = function ( e, data ) {
                        uploadForm.removeClass( 'dragging' ).addClass( 'uploading' );

                        data.formData   = {
                            session     : Session.getToken()
                        };
                        data.submit();
                        $rootScope.$broadcast( events.FILEUPLOADER_UPLOADING );
                    },
                    doneHandler         = function ( e, data ) {
                        $( 'img', uploadForm ).attr( 'src', data.result.path.replace( /public\//, '' ) );
                        uploadForm.removeClass( 'uploading' ).addClass( 'uploaded' );
                        $rootScope.$broadcast( events.FILEUPLOADER_DONE, data.result );
                    },
                    dragleaveHandler    = function () {
                        uploadForm.removeClass( 'dragging' );
                    },
                    dragoverHandler     = function () {
                        uploadForm.removeClass( 'uploading' ).addClass( 'dragging' );
                    },
                    failHandler         = function () {
                        uploadForm.removeClass( 'uploading' ).addClass( 'failed' );
                        $rootScope.$broadcast( events.FILEUPLOADER_ERROR );
                    };

                uploadForm.fileupload({
                    add                 : addHandler,
                    dataType            : 'json',
                    done                : doneHandler,
                    dragover            : dragoverHandler,
                    dropZone            : uploadForm,
                    fail                : failHandler,
                    sequentialUploads   : true,
                    url                 : scope.config.url
                }).on( 'dragleave', dragleaveHandler );

                if ( scope.config.fileName ) {
                    scope.fileName  = scope.config.fileName;
                } else {
                    scope.fileName  = 'file';
                }

                scope.browse        = function ( e ) {
                    e.preventDefault();

                    $( '.uploader', uploadForm ).click();
                };
            }
        };
    };
});