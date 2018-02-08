'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'apis', {
                abstract    : true,
                parent      : 'admin',
                url         : '/apis',
                views       : {
                    'admin-main'    : {
                        templateUrl : 'partials/apis/base',
                        controller  : 'ApisBaseCtrl'
                    }
                }
            })
            .state( 'apis.list', {
                url         : '/list',
                views       : {
                    'apis-main' : {
                        templateUrl : 'partials/apis/list',
                        controller  : 'ApisListCtrl'
                    }
                }
            })
            .state( 'apis.create', {
                url         : '/apis',
                views       : {
                    'apis-main' : {
                        templateUrl : 'partials/apis/create',
                        controller  : 'ApisCreateCtrl'
                    }
                }
            })
            .state( 'apis.edit', {
                url         : '/edit/:id',
                views       : {
                    'apis-main' : {
                        templateUrl : 'partials/apis/create',
                        controller  : 'ApisEditCtrl'
                    }
                }
            });
    };
});