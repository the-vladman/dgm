'use strict';

define( function () {
    return function ( $scope, Apis ) {
        $scope.create   = function () {
            Apis.create( $scope.api );
        };

        $scope.$on( Apis.getEvent( 'CREATED' ), function () {
            $scope.$state.go( 'apis.list' );
        });
        $scope.$on( 'CREATE_API', function () {
            $scope.create();
        });
    };
});