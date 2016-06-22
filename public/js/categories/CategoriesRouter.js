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
                url         : '/list',
                views       : {
                    'categories-main'   : {
                        templateUrl     : 'partials/categories/list',
                        controller      : 'CategoriesListCtrl'
                    }
                }
            })
            .state( 'categories.create', {
                url         : '/create',
                views       : {
                    'categories-main'   : {
                        templateUrl     : 'partials/categories/create',
                        controller      : 'CategoriesCreateCtrl'
                    }
                }
            })
            .state( 'categories.edit', {
                url         : '/edit/:id',
                views       : {
                    'categories-main'   : {
                        templateUrl     : 'partials/categories/create',
                        controller      : 'CategoriesEditCtrl'
                    }
                }
            });
    };
});