'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'content', {
                abstract    : true,
                parent      : 'admin',
                url         : '/content',
                views       : {
                    'admin-main'    : {
                        templateUrl : 'partials/content/base',
                        controller  : 'ContentBaseCtrl'
                    }
                }
            })
            .state( 'content.categoryCreate', {
                url         : '/category/create',
                views       : {
                    'content-main'  : {
                        templateUrl : 'partials/content/categoryCreate',
                        controller  : 'CategoriesCreateCtrl'
                    }
                }
            })
            .state( 'content.summary', {
                url         : '/summary'
            });
    };
});