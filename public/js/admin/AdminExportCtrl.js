'use strict';

define( function () {
    return function ( $scope ) {
        $scope.filters  = {
            categories      : {
                categories  : true,
                sections    : true,
                tags        : true
            },
            posts           : {
                archived    : true,
                drafts      : true,
                published   : true
            },
            users           : {
                admin       : true,
                author      : true,
                editor      : true,
                super       : true
            }
        };
        $scope.export   = function () {
            
        };
    };
});