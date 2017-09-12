'use strict';

define(function() {
  return function($scope, Posts) {
    $scope.page = 1;
    $scope.per_page = 10;
    $scope.query = function() {
      $scope.posts = Posts.query({
        expanded: true,
        page: $scope.page,
        per_page: $scope.per_page
      });
    };

    $scope.$on(Posts.getEvent('QUERIED'), function() {
      $scope.total = Posts.getTotal();
    });

    $scope.query();
  };
});
