'use strict';

define( function () {
    return function ( $scope ) {
        $scope.save     = function () {
            $scope.$broadcast( 'CREATE_CATEGORY' );
        };
    };
});