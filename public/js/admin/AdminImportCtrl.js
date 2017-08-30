'use strict';

define(function() {
  return function($scope, events) {
    $scope.config = {
      fileName: 'data',
      url: 'cms-api/collections'
    };

    $scope.$on(events.FILEUPLOADER_DONE, function() {
      $scope.$state.go('admin');
    });
  };
});
