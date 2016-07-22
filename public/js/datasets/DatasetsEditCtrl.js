'use strict';

define( function () {
    return function ( $scope, $stateParams, Datasets ) {
        $scope.dataset  = Datasets.get( $stateParams.id );

        $scope.create   = function () {
            Datasets.update( $stateParams.id, $scope.dataset );
        };

        $scope.$on( Datasets.getEvent( 'DELETED' ), function () {
            $scope.$state.go( 'datasets.list' );
        });
        $scope.$on( Datasets.getEvent( 'UPDATED' ), function () {
            $scope.$state.go( 'datasets.list' );
        });
        $scope.$on( 'UPDATE_DATASET', function () {
            $scope.create();
        });
        $scope.$on( 'REMOVE_DATASET', function () {
            Datasets.remove( $stateParams.id );
        });
    };
});