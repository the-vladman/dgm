'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'datasets', {
                abstract    : true,
                parent      : 'admin',
                url         : '/datasets',
                views       : {
                    'admin-main'    : {
                        templateUrl : 'partials/datasets/base',
                        controller  : 'DatasetsBaseCtrl'
                    }
                }
            })
            .state( 'datasets.list', {
                url         : '/list',
                views       : {
                    'datasets-main' : {
                        templateUrl : 'partials/datasets/list',
                        controller  : 'DatasetsListCtrl'
                    }
                }
            })
            .state( 'datasets.create', {
                url         : '/datasets',
                views       : {
                    'datasets-main' : {
                        templateUrl : 'partials/datasets/create',
                        controller  : 'DatasetsCreateCtrl'
                    }
                }
            })
            .state( 'datasets.edit', {
                url         : '/edit/:id',
                views       : {
                    'datasets-main' : {
                        templateUrl : 'partials/datasets/create',
                        controller  : 'DatasetsEditCtrl'
                    }
                }
            });
    };
});