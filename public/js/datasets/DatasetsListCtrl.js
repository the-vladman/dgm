'use strict';

define( function () {
    return function ( $scope, Datasets ) {
        $scope.page     = 1;
        $scope.per_page = 10;
        $scope.query    = function () {
            $scope.datasets = Datasets.query({
                page        : $scope.page,
                per_page    : $scope.per_page
            });
        };

        $scope.$on( Datasets.getEvent( 'QUERIED' ), function () {
            $scope.total    = Datasets.getTotal();
        });

        $scope.query();
    };
});