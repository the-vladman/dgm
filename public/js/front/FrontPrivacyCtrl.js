'use strict';

define( function () {
    return function ( $scope, $sce, Posts ) {
        Posts.get( 'aviso-de-privacidad' ).$promise.then( function ( data ) {
            $scope.content  = $sce.trustAsHtml( data.content );
        });
    };
});
