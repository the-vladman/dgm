'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'users', {
                abstract    : true,
                parent      : 'admin',
                url         : '/users',
                views       : {
                    'admin-main'    : {
                        templateUrl : 'partials/users/base'
                    }
                }
            })
            .state( 'users.list', {
                url         : '/list',
                views       : {
                    'users-main'    : {
                        templateUrl : 'partials/users/list',
                        controller  : 'UsersAdminCtrl'
                    }
                }
            })
            .state( 'users.create', {
                url         : '/create',
                views       : {
                    'users-main'    : {
                        templateUrl : 'partials/users/create',
                        controller  : 'UsersCreateCtrl'
                    }
                }
            });
    };
});