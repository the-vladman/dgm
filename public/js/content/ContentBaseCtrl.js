'use strict';

define( function () {
    return function ( $scope ) {
        $scope.createCategory   = function () {
            $scope.$broadcast( 'CREATE_CATEGORY' );
        };
    };
});