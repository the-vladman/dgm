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
                        templateUrl : 'partials/content/base'
                    }
                }
            })
            .state( 'content.summary', {
                url         : '/summary'
            })
    };
});