'use strict';

define( function () {
    return function ( $scope, $stateParams, CkanService ) {
        var downloaded  = [
                'concesiones-mineras',
                'directorio-registro-federal-de-las-organizaciones-de-la-sociedad-civil',
                'proyecciones-de-la-poblacion-de-mexico',
                'catalogo-de-centros-de-trabajo',
                'catalogo-de-nucleos-agrarios'
            ],
            recommended = [
                'quien-es-quien-en-los-precios',
                'ubicacion-de-codigos-postales-en-mexico',
                'prospera-programa-de-inclusion-social',
                'indice-de-rezago-social20002005-y-2010-nacionalestatalmunicipal-y-localidad',
                'catalogo-de-nucleos-agrarios'
            ],
            query       = function ( type ) {
                switch( type ) {
                    case 0 :
                        $scope.datasets     = Array();
                        for ( var i = 0; i < recommended.length; i++ ) {
                            $scope.datasets.push( CkanService.dataset( recommended[i] ) );
                        }
                        break;
                    case 1 :
                        var q       = ( $stateParams.category ) ? 'tags:' + $stateParams.category : '';

                        $scope.datasets = CkanService.datasets( q, 5, 'dcat_modified desc' );
                        break;
                    case 2 :
                        $scope.datasets     = Array();
                        for ( var i = 0; i < downloaded.length; i++ ) {
                            $scope.datasets.push( CkanService.dataset( downloaded[i] ) );
                        }
                        break;
                }
            };

        $scope.load     = function ( e, type ) {
            var el      = $( e.currentTarget );
            if ( !el.hasClass( 'active' ) ) {
                $( '.active', '.section-data .data-list' ).removeClass( 'active' );
                el.addClass( 'active' );

                query( type );
            }
        };
        $scope.select   = function ( dataset ) {
            window.open( 'busca/dataset/' + dataset, '_blank' );
        };

        query( 0 );
    };
});