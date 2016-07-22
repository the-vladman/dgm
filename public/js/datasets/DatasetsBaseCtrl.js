'use strict';

define( function () {
    return function ( $scope ) {
        $scope.remove   = function () {
            $scope.$broadcast( 'REMOVE_DATASET' );
        };
        $scope.save     = function () {
            $scope.$broadcast( 'CREATE_DATASET' );
        };
        $scope.update   = function () {
            $scope.$broadcast( 'UPDATE_DATASET' );
        };
    };
});