'use strict';

define( function () {
    return function ( $scope, Categories ) {
        $scope.page     = 1;
        $scope.query    = function () {
            $scope.categories   = Categories.query({
                expanded        : true,
                page            : $scope.page,
                per_page        : 10,
                sort            : 'type'
            });
        };

        $scope.query();
    };
});