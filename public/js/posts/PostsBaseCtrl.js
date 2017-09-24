'use strict';

define(function() {
  return function($scope) {
    $scope.remove = function() {
      $scope.$broadcast('POST_REMOVE');
    };
    $scope.save = function() {
      $scope.$broadcast('POST_SAVE');
    };
    $scope.update = function() {
      $scope.$broadcast('POST_UPDATE');
    };
  };
});
