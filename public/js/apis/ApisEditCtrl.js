'use strict';

define( function () {
    return function ( $scope, $stateParams, Apis ) {
        $scope.api  = Apis.get( $stateParams.id );

        $scope.create   = function () {
            Apis.update( $stateParams.id, $scope.api );
        };

        $scope.$on( Apis.getEvent( 'DELETED' ), function () {
            $scope.$state.go( 'apis.list' );
        });
        $scope.$on( Apis.getEvent( 'UPDATED' ), function () {
            $scope.$state.go( 'apis.list' );
        });
        $scope.$on( 'UPDATE_API', function () {
            $scope.create();
        });
        $scope.$on( 'REMOVE_API', function () {
            Apis.remove( $stateParams.id );
        });
    };
});