'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'front', {
                abstract    : true,
                views       : {
                    application     : {
                        templateUrl : 'partials/front/home',
                        controller  : 'FrontCtrl'
                    }
                }
            })
            .state( 'landing', {
                parent      : 'front',
                url         : '/',
                views       : {
                    'front-container'   : {
                        templateUrl     : 'partials/front/landing'
                    }
                }
            });
    };
});