'use strict';

define( function () {
    return function ( $scope, Users ) {
        $scope.page     = 1;
        $scope.query    = function () {
            $scope.users    = Users.query({
                page        : $scope.page,
                per_page    : 10
            });
        };

        $scope.query();
    };
});