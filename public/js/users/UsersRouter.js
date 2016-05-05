'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'users', {
                abstract    : true,
                parent      : 'admin',
                views       : {
                    'admin-main'    : {
                        templateUrl : 'partials/users/base'
                    }
                }
            })
            .state( 'users.list', {
                url         : '/users',
                views       : {
                    'users-main'    : {
                        templateUrl : 'partials/users/list',
                        controller  : 'UsersAdminCtrl'
                    }
                }
            });
    };
});