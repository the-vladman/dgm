'use strict';

define( function () {
    return function ( $rootScope, Sessions ) {
        $( 'body' ).addClass( 'admin' );

        $rootScope.user     = Sessions.getUser();
    };
});