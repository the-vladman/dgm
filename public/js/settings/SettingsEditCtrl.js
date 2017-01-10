'use strict';

define( function (){
  return function( $scope, $stateParams, events, Settings ){
    $scope.configCover  = {
        fileName    : 'cover_photo',
        url         : 'cms-api/settings'
    };

    $scope.setting  = Settings.get( 'image-landing' );

    $scope.$on( events.FILEUPLOADER_DONE, function ( e, data ) {
        $scope.setting[ Object.keys( data )[0] ]   = data[ Object.keys( data )[0] ];
        $scope.update();
    });

    $scope.update       = function() {
        Settings.update(  $scope.setting._id.valueOf() , $scope.setting )
    };

    $scope.$on( Settings.getEvent( 'UPDATED' ), function ( e, data ) {
        $scope.setting.cover_photo = data.cover_photo;
    });
  };
});
