'use strict';

define(function() {
  return function($scope, events, Sessions) {
    $scope.login = function() {
      console.log('$scope.session', $scope.session);
      Sessions.start($scope.session);
    };

    $scope.$on(events.LOGIN_SUCCESS, function() {
      $scope.$state.go('admin');
    });
  };
});
