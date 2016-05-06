'use strict';

define( function () {
    return function ( $scope ) {
        var query       = '';

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