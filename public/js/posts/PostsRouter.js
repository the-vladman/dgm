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
                        templateUrl : 'partials/posts/base'
                    }
                }
            })
            .state( 'posts.summary', {
                url     : '/summary'
            });
    };
});