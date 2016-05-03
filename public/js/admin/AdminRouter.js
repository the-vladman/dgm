'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'admin-login', {
                url     : '/admin',
                views   : {
                    application     : {
                        templateUrl : 'partials/admin/login',
                        controller  : 'AdminCtrl'
                    }
                }
            });
    };
});