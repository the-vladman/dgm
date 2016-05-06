'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'front', {
                abstract    : true,
                views       : {
                    application         : {
                        templateUrl     : 'partials/front/base',
                        controller      : 'FrontCtrl'
                    }
                }
            })
            .state( 'home', {
                abstract    : true,
                parent      : 'front',
                views       : {
                    'front-container'   : {
                        templateUrl     : 'partials/front/home'
                    }
                }
            })
            .state( 'landing', {
                parent      : 'home',
                url         : '/',
                views       : {
                    'landing-search'    : {
                        templateUrl     : 'partials/front/landingSearch',
                        controller      : 'LandingSearchCtrl'
                    }
                }
            });
    };
});