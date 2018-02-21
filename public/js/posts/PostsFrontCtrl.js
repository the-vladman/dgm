'use strict';

define( function () {
    return function ( $scope, $stateParams, $sce, Posts, CkanService ) {
        $scope.section  = $stateParams.section;
        $scope.post     = Posts.get( $stateParams.post, true );

        $scope.$on( Posts.getEvent( 'RETRIEVED' ), function () {
            if ( $scope.post.iframe ) {
                $scope.iframe   = $sce.trustAsResourceUrl( $scope.post.iframe );
            }
            $scope.content      = $sce.trustAsHtml( $scope.post.content );

            if ( $scope.post.datasets && $scope.post.datasets.length > 0 ) {
                $scope.datasets         = Array();

                for ( var i = 0; i < $scope.post.datasets.length; i++ ) {
                    if ( $scope.post.datasets[i] != '' ) {
                        $scope.datasets.push( CkanService.dataset( $scope.post.datasets[i] ) );
                    }
                }
            }

        });
    };
});