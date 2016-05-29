'use strict';

define( function () {
    return function ( $scope, $stateParams, CkanService ) {
        var query       = function ( order ) {
            var q       = ( $stateParams.category ) ? 'tags:' + $stateParams.category : '';

            $scope.datasets = CkanService.datasets( q, 3, order );
        };

        $scope.load     = function ( e, type ) {
            var el      = $( e.currentTarget );
            if ( !el.hasClass( 'active' ) ) {
                $( '.active', '.section-data .data-list' ).removeClass( 'active' );
                el.addClass( 'active' );

                switch( type ) {
                    case 0 :
                    case 2 :
                        query( 'dcat_modified desc' );
                        break;
                    case 1 :
                        query( 'metadata_created desc' );
                        break;
                }
            }
        };
        $scope.select   = function ( dataset ) {
            window.open( 'http://busca.datos.gob.mx/#!/conjuntos/' + dataset, '_blank' );
        };

        query( 'dcat_modified desc' );
    };
});