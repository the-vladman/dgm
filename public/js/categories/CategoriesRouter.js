'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'categories', {
                abstract    : true,
                parent      : 'admin',
                url         : '/categories',
                views       : {
                    'admin-main'    : {
                        templateUrl : 'partials/categories/base',
                        controller  : 'CategoriesBaseCtrl'
                    }
                }
            })
            .state( 'categories.list', {
                url         : '/list'
            });
    };
});