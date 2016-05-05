'use strict';

define( function () {
    return function ( $scope, $stateParams, Users ) {
        $scope.current  = Users.get( $stateParams.id );

        $scope.save     = function () {
            Users.update( $stateParams.id, $scope.current );
        };

        $scope.$on( Users.getEvent( 'DELETED' ), function () {
            $scope.$state.go( 'users.list' );
        });
        $scope.$on( Users.getEvent( 'UPDATED' ), function () {
            $scope.$state.go( 'users.list' );
        });
        $scope.$on( 'REMOVE_USER', function () {
            Users.remove( $stateParams.id );
        });
        $scope.$on( 'UPDATE_USER', function () {
            $scope.save();
        });
    };
});