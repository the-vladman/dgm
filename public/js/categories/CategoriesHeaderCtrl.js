'use strict';

define(function() {
  return function($scope, $stateParams, Categories) {
    $scope.category = Categories.get($stateParams.category, true);
  };
});
