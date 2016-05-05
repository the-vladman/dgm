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
                        templateUrl : 'partials/users/base',
                        controller  : 'UsersBaseCtrl'
                    }
                }
            })
            .state( 'users.details', {
                url         : '/details/:id',
                views       : {
                    'users-main'    : {
                        templateUrl : 'partials/users/details',
                        controller  : 'UsersDetailsCtrl'
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