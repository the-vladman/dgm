'use strict';

define(function() {
  return function($scope) {
    $scope.remove = function() {
      $scope.$broadcast('REMOVE_CATEGORY');
    };
    $scope.save = function() {
      $scope.$broadcast('CREATE_CATEGORY');
    };
    $scope.update = function() {
      $scope.$broadcast('UPDATE_CATEGORY');
    };
  };
});
