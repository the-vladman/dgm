'use strict';

define( function () {
    return function ( $scope ) {
        $scope.remove   = function () {
            $scope.$broadcast( 'REMOVE_USER' );
        };
        $scope.update   = function () {
            $scope.$broadcast( 'UPDATE_USER' );
        };
    };
});