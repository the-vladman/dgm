'use strict';

define( function () {
    return function ( $scope ) {
        $scope.remove   = function () {
            $scope.$broadcast( 'REMOVE_API' );
        };
        $scope.save     = function () {
            $scope.$broadcast( 'CREATE_API' );
        };
        $scope.update   = function () {
            $scope.$broadcast( 'UPDATE_API' );
        };
    };
});