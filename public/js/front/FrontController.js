'use strict';

define( function () {
    return function ( $cookies, $modal ) {
        $( 'body' ).addClass( 'front' ).removeClass( 'admin' );

        if ( !$cookies.get( 'dgm.modal.dismissed' ) ) {
            $modal.open({
                controller  : 'FrontPopupCtrl',
                templateUrl : 'partials/front/popup'
            });
        }
    };
});