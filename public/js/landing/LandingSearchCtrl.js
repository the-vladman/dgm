'use strict';

define( function () {
    return function ( $scope, Categories ) {
        var query       = '';

        $scope.tags     = Categories.query({
            slug        : {
                $ne     : 'nula'
            },
            page        : 1,
            per_page    : 99,
            type        : 'TAG'
        });
        $scope.search   = function () {
            query       = '';
            if ( $scope.keyword ) {
                query   += 'q=' + $scope.keyword + '&';
            }

            if ( $scope.category ) {
                query   += 'tags=' + $scope.category;
            }

            window.open( 'busca/dataset?' + query, '_blank' );
        };
    };
});