'use strict';

define(function(require) {
  var PostsBaseCtrl = require('posts/PostsBaseCtrl');
  var PostsCreateCtrl = require('posts/PostsCreateCtrl');
  var PostsEditCtrl = require('posts/PostsEditCtrl');
  var PostsFrontCtrl = require('posts/PostsFrontCtrl');
  var PostsListCtrl = require('posts/PostsListCtrl');
  var PostsRouter = require('posts/PostsRouter');
  var PostsSectionCtrl = require('posts/PostsSectionCtrl');
  var PostsService = require('posts/PostsService');

  var PostsModule = angular.module('PostsModule', [
    'ngSanitize'
  ]);

  PostsModule.config(['$stateProvider', PostsRouter]);

  PostsModule.controller('PostsBaseCtrl', ['$scope', PostsBaseCtrl]);

  PostsModule.controller('PostsCreateCtrl', ['$scope', 'events', 'PostsService', 'CategoriesService', 'UsersService', PostsCreateCtrl]);

  PostsModule.controller('PostsEditCtrl', ['$scope', '$stateParams', 'events', 'PostsService', 'CategoriesService', 'UsersService', PostsEditCtrl]);

  PostsModule.controller('PostsFrontCtrl', ['$scope', '$stateParams', '$sce', 'PostsService', 'CkanService', PostsFrontCtrl]);

  PostsModule.controller('PostsListCtrl', ['$scope', 'PostsService', PostsListCtrl]);

  PostsModule.controller('PostsSectionCtrl', ['$scope', '$location', '$stateParams', 'PostsService', 'CategoriesService', PostsSectionCtrl]);

  PostsModule.factory('PostsService', ['BaseService', PostsService]);
});
