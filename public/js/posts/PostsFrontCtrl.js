'use strict';

define( function () {
    return function ( $scope, $stateParams, $sce, Posts ) {
        $scope.post     = Posts.get( $stateParams.post, true );

        $scope.$on( Posts.getEvent( 'RETRIEVED' ), function () {
            $scope.content  = $sce.trustAsHtml( $scope.post.content );
        });
    };
});