'use strict';

define(function() {
  return function($scope, $stateParams, Categories) {
    Categories.query({
      slug: {
        $ne: 'nula'
      },
      page: 1,
      per_page: 9999,
      type: 'TAG'
    }).$promise.then(function(data) {
      var indexes = [];
      $scope.categories = [];

      for (var i = 0; i < 3; i++) {
        var index;

        do {
          index = Math.floor(Math.random() * (data.length));
        } while (indexes.indexOf(index) != -1 || data[index].slug == $stateParams.category)

        $scope.categories.push(data[index]);
        indexes.push(index);
      }
    });
  };
});
