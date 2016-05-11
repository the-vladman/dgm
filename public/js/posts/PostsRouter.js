'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'posts', {
                abstract    : true,
                parent      : 'admin',
                url         : '/posts',
                views       : {
                    'admin-main'    : {
                        templateUrl : 'partials/posts/base',
                        controller  : 'PostsBaseCtrl'
                    }
                }
            })
            .state( 'posts.summary', {
                url         : '/summary'
            })
            .state( 'posts.create', {
                url         : '/create',
                views       : {
                    'posts-main'    : {
                        templateUrl : 'partials/posts/create',
                        controller  : 'PostsCreateCtrl'
                    }
                }
            });
    };
});