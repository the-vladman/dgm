'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'admin', {
                url     : '/admin',
                resolve : {
                    loginRequired   : [ '$q', '$state', '$timeout', 'SessionsService', function ( $q, $state, $timeout, Sessions ) {
                        if ( !Sessions.isLoggedIn() ) {
                            $timeout( function () {
                                $state.go( 'admin-login' );
                            });
                            return $q.reject( 'User not logged in!' );
                        }
                    }]
                },
                views   : {
                    application     : {
                        templateUrl : 'partials/admin/home',
                        controller  : 'AdminCtrl'
                    }
                }
            });
    };
});