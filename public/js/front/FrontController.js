'use strict';

define( function () {
    return function ( $cookies, $modal ) {
        $( 'body' ).addClass( 'front' ).removeClass( 'admin' );
    };
});