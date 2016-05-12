'use strict';

define( function () {
    return function ( $scope ) {
        $scope.save     = function () {
            $scope.$broadcast( 'CREATE_CATEGORY' );
        };
        $scope.update   = function () {
            $scope.$broadcast( 'UPDATE_CATEGORY' );
        };
    };
});