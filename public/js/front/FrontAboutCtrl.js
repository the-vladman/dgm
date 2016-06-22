'use strict';

define( function () {
    return function ( $scope, $sce, Posts ) {
        Posts.get( 'acerca' ).$promise.then( function ( data ) {
            $scope.content  = $sce.trustAsHtml( data.content );
        });
    };
});