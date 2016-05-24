'use strict';

define( function () {
    return function ( $scope, Categories ) {
        var query       = '';

        $scope.tags     = Categories.query({
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
                query   += 'categoria=' + $scope.category;
            }

            window.open( 'http://busca.datos.gob.mx/#!/conjuntos/?' + query, '_blank' );
        };
    };
});