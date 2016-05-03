'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'home', {
                url     : '/',
                views   : {
                    application     : {
                        templateUrl : 'partials/front/home.jade'
                    }
                }
            });
    };
});