'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'admin-login', {
                url     : 'login',
                views   : {
                    application     : {
                        templateUrl : 'partials/admin/login',
                        controller  : 'SessionsStartCtrl'
                    }
                }
            });
    };
});