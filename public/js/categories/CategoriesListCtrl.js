'use strict';

define(function() {
  return function($scope, Categories) {
    $scope.page = 1;
    $scope.per_page = 10;
    $scope.query = function() {
      $scope.categories = Categories.query({
        expanded: true,
        page: $scope.page,
        per_page: $scope.per_page,
        sort: 'type'
      });
    };

    $scope.$on(Categories.getEvent('QUERIED'), function() {
      $scope.total = Categories.getTotal();
    });

    $scope.query();
  };
});
