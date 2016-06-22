'use strict';

define( function () {
    return function ( $scope, Users ) {
        $scope.page     = 1;
        $scope.per_page = 10;
        $scope.query    = function () {
            $scope.users    = Users.query({
                page        : $scope.page,
                per_page    : $scope.per_page
            });
        };

        $scope.$on( Users.getEvent( 'QUERIED' ), function () {
            $scope.total    = Users.getTotal();
        });

        $scope.query();
    };
});