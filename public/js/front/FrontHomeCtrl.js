'use strict';

define( function () {
    return function ( $scope, $cookies, $modal ) {
        $scope.closeFunctionality   = function () {
            $( '#site-functionality' ).css( 'display', 'none' );

            $cookies.put( 'dgm.functionality.dismissed', true );
        };
        $scope.openVideo            = function ( e ) {
            e.preventDefault();
            
            $modal.open({
                controller  : 'FrontPopupCtrl',
                size        : 'lg',
                templateUrl : 'partials/front/popup'
            });
        };

        if ( !$cookies.get( 'dgm.functionality.dismissed' ) ) {
            $( '#site-functionality' ).css( 'display', 'block' );
        }
    };
});