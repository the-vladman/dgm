'use strict';

define( function () {
    return function ( $scope, $cookies ) {
        $scope.closeFunctionality   = function () {
            $( '#site-functionality' ).css( 'display', 'none' );

            $cookies.put( 'dgm.functionality.dismissed', true );
        };

        if ( !$cookies.get( 'dgm.functionality.dismissed' ) ) {
            $( '#site-functionality' ).css( 'display', 'block' );
        }
    };
});