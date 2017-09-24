'use strict';
// ESTE ES EL CONTROLADOR DE LA VISTA DE BLOG
define(function() {
  return function($scope, $location, $stateParams, Posts, Categories) {
    var queryFeatured = function() {
      $scope.featured = Posts.query({
        expanded: true,
        featured: true,
        page: 1,
        per_page: 1,
        section: $scope.section_id,
        status: 'PUBLISHED'
      });
    };
    $scope.page = 1;
    $scope.per_page = ($stateParams.section == 'blog') ? 6 : 9;
    $scope.search = {};
    $scope.section = $stateParams.section;
    $scope.options = Categories.query({
      slug: {
        $ne: 'nula'
      },
      page: 1,
      per_page: 9999,
      type: 'TAG'
    });

    /*******************************
     * FUNCIONES AUXILIARES
     * funcion que hace el query
     * @return {[type]} [description]
     */
    $scope.query = function() {
      $scope.categories = Categories.query({
        page: 1,
        per_page: 9999,
        section: $scope.section_id,
        type: 'CATEGORY'
      });

      Posts.query({
        category: $scope.category_id,
        expanded: true,
        featured: false,
        name: $scope.search.keyword,
        order: 'DESC',
        page: $scope.page,
        per_page: $scope.per_page,
        section: $scope.section_id,
        sort: 'creation_date',
        status: 'PUBLISHED',
        tag: $scope.search.tag
      }).$promise.then(function(data) {
        $scope.posts = data;
        $scope.total = Posts.getTotal();
      });

      if ($scope.search.tag) {
        for (var i = 0; i < $scope.options.length; i++) {
          if ($scope.options[i]._id == $scope.search.tag) {
            $location.search('tag', $scope.options[i].slug);
          }
        }
      }
    };

    if ($stateParams.section_id) {
      $scope.section_id = $stateParams.section_id;
      queryFeatured();
      $scope.query();
    } else {
      Categories.query({
        page: 1,
        per_page: 1,
        select: 'name',
        slug: $scope.section,
        type: 'SECTION'
      }).$promise.then(function(data) {
        $scope.section_id = data[0]._id;
        $scope.query();
        queryFeatured();
      });
    }
    if ($stateParams.category) {
      if ($stateParams.category_id) {
        $scope.category_id = $stateParams.category_id;
        $scope.query();
      } else {
        Categories.query({
          page: 1,
          per_page: 1,
          select: 'name',
          slug: $stateParams.category,
          type: 'CATEGORY'
        }).$promise.then(function(data) {
          $scope.category_id = data[0]._id;
          $scope.query();
        });
      }
    }
    if ($stateParams.tag) {
      Categories.query({
        per_page: 1,
        page: 1,
        slug: $stateParams.tag,
        type: 'TAG'
      }).$promise.then(function(tags) {
        $scope.search.tag = tags[0];
        $scope.query();
      });
    }

    $scope.$watch('search.tag', function(tag) {
      if (tag) {
        $scope.query();
      }
    });
  };
});
