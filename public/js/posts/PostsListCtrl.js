'use strict';

define( function () {
    return function ( $scope, Posts ) {
        $scope.page     = 1;
        $scope.query    = function () {
            $scope.posts    = Posts.query({
                expanded    : true,
                page        : $scope.page,
                per_page    : 10
            });
        };

        $scope.query();
    };
});