'use strict';

define( function () {
    return function ( $scope, $cookies, $uibModalInstance ) {
        $scope.close    = function () {
            $cookies.put( 'dgm.modal.dismissed', true );
            $uibModalInstance.close();
        };
    };
});