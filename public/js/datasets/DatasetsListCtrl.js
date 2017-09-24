'use strict';

define(function() {
  return function($scope, Datasets) {
    $scope.page = 1;
    $scope.per_page = 10;
    $scope.query = function() {
      $scope.datasets = Datasets.query({
        order: 'DESC',
        page: $scope.page,
        per_page: $scope.per_page,
        sort: 'creation_date'
      });
    };

    $scope.$on(Datasets.getEvent('QUERIED'), function() {
      $scope.total = Datasets.getTotal();
    });

    $scope.query();
  };
});
