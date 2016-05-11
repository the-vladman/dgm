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
                var addHandler          = function ( e, data ) {
                        element.removeClass( 'dragging' ).addClass( 'uploading' );

                        data.formData   = {
                            session     : Session.getToken()
                        };
                        data.submit();
                        $rootScope.$broadcast( events.FILEUPLOADER_UPLOADING );
                    },
                    doneHandler         = function ( e, data ) {
                        $( 'img', element ).attr( 'src', data.result.path );
                        element.removeClass( 'uploading' ).addClass( 'uploaded' );
                        $rootScope.$broadcast( events.FILEUPLOADER_DONE, data.result );
                    },
                    dragleaveHandler    = function () {
                        element.removeClass( 'dragging' );
                    },
                    dragoverHandler     = function () {
                        element.removeClass( 'uploading' ).addClass( 'dragging' );
                    },
                    failHandler         = function () {
                        element.removeClass( 'uploading' ).addClass( 'failed' );
                        $rootScope.$broadcast( events.FILEUPLOADER_ERROR );
                    };

                if ( scope.config.fileName ) {
                    scope.fileName  = scope.config.fileName;
                } else {
                    scope.fileName  = 'file';
                }

                scope.browse        = function ( e ) {
                    e.preventDefault();

                    $( '.uploader', element ).click();
                };

                element.fileupload({
                    add                 : addHandler,
                    dataType            : 'json',
                    done                : doneHandler,
                    dragover            : dragoverHandler,
                    dropZone            : element,
                    fail                : failHandler,
                    sequentialUploads   : true,
                    url                 : scope.config.url
                }).on( 'dragleave', dragleaveHandler );
            }
        };
    };
});