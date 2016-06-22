'use strict';

define( function () {
    return function ( $scope, $uibModalInstance ) {
        $scope.close    = function () {
            $uibModalInstance.close();
        };
    };
});