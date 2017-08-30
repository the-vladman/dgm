'use strict';

define(function() {
  return function($scope, Collections) {
    $scope.filters = {
      categories: {
        categories: true,
        sections: true,
        tags: true
      },
      posts: {
        archived: true,
        drafts: true,
        published: true
      },
      users: {
        admin: true,
        author: true,
        editor: true,
        super: true
      }
    };
    $scope.export = function() {
      Collections.export($scope.filters).$promise.then(function(data) {
        var blob = data.response.blob,
          filename = data.response.filename || 'data.zip';

        saveAs(blob, filename);
      });
    };
  };
});
