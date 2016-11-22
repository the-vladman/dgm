'use strict';

 define( function () {
     return function ( $scope, $sce, Posts ) {
         Posts.get( 'declaratoria-de-accesibilidad' ).$promise.then( function ( data ) {
             $scope.content  = $sce.trustAsHtml( data.content );
         });
     };
 });
