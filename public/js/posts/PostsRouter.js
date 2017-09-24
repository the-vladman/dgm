'use strict';

define(function() {
  return function($stateProvider) {
    $stateProvider
      .state('posts', {
        abstract: true,
        parent: 'admin',
        url: '/posts',
        views: {
          'admin-main': {
            templateUrl: 'partials/posts/base',
            controller: 'PostsBaseCtrl'
          }
        }
      })
      .state('posts.list', {
        url: '/list',
        views: {
          'posts-main': {
            templateUrl: 'partials/posts/list',
            controller: 'PostsListCtrl'
          }
        }
      })
      .state('posts.create', {
        url: '/create',
        views: {
          'posts-main': {
            templateUrl: 'partials/posts/create',
            controller: 'PostsCreateCtrl'
          }
        }
      })
      .state('posts.edit', {
        url: '/edit/:id',
        views: {
          'posts-main': {
            templateUrl: 'partials/posts/create',
            controller: 'PostsEditCtrl'
          }
        }
      });
  };
});
