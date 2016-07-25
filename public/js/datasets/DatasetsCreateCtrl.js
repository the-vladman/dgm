'use strict';

define( function () {
    return function ( $scope, Datasets ) {
        $scope.create   = function () {
            Datasets.create( $scope.dataset );
        };

        $scope.$on( Datasets.getEvent( 'CREATED' ), function () {
            $scope.$state.go( 'datasets.list' );
        });
        $scope.$on( 'CREATE_DATASET', function () {
            $scope.create();
        });
    };
});