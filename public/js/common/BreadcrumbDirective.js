'use strict';

define( function () {
    return function ( $rootScope, $location ) {
        return {
            restrict    : 'E',
            templateUrl : 'partials/common/breadcrumb',
            link        : function ( scope ) {
                scope.crumbs    = [];
                var sections    = $location.path().substring( 1 ).split( '/' ),
                    query       = $location.search();

                if ( sections[0] == 'herramientas' || sections[0] == 'blog' ) {
                    scope.crumbs.push({
                        params  : {
                            section     : sections[0]
                        },
                        sref    : 'front.section',
                        url     : sections[0]
                    });
                }
                if ( query && query.category ) {
                    scope.crumbs.push({
                        params  : {
                            section     : sections[0],
                            category    : query.category
                        },
                        sref    : 'front.section',
                        url     : query.category.replace( new RegExp( '-', 'g' ), ' ' )
                    });
                }
            }
        };
    };
});