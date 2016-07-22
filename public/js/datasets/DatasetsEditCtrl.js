'use strict';

define( function () {
    return function ( $scope, $stateParams, Datasets ) {
        $scope.dataset  = Datasets.get( $stateParams.id );

        $scope.create   = function () {
            Datasets.update( $stateParams.id, $scope.dataset );
        };

        $scope.$on( Datasets.getEvent( 'UPDATED' ), function () {
            $scope.$state.go( 'datasets.list' );
        });
    };
});