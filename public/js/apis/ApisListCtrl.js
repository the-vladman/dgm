'use strict';

define(function() {
  return function($scope, Apis) {
    $scope.page = 1;
    $scope.per_page = 10;
    $scope.query = function() {
      $scope.apis = Apis.query({
        order: 'DESC',
        page: $scope.page,
        per_page: $scope.per_page,
        sort: 'creation_date'
      });
    };

    $scope.$on(Apis.getEvent('QUERIED'), function() {
      $scope.total = Apis.getTotal();
    });

    $scope.query();
  };
});
