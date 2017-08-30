'use strict';

define(function() {
  return function($scope, events, Sessions) {
    Sessions.terminate(Sessions.getToken());

    $scope.$on(events.LOGOUT_SUCCESS, function() {
      $scope.$state.go('landing');
    });
  };
});
