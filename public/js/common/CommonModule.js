'use strict';

define(function(require) {
  var BaseService = require('common/BaseService');
  var BreadcrumbDirective = require('common/BreadcrumbDirective');
  var CkanService = require('common/CkanService');
  //var CustomSelectDirective = require('common/CustomSelectDirective');
  var ExcerptFilter = require('common/ExcerptFilter');
  var FbShareDirective = require('common/FbShareDirective');
  var FileUploaderDirective = require('common/FileUploaderDirective');
  var NoSpaceFilter = require('common/NoSpaceFilter');
  var TweetDirective = require('common/TweetDirective');
  var ChargeImageDirective = require('common/ChargeImageDirective');

  var CommonModule = angular.module('CommonModule', []);

  CommonModule.directive('breadcrumb', ['$location', 'events', BreadcrumbDirective]);

  //CommonModule.directive('customSelect', ['$timeout', CustomSelectDirective]);

  CommonModule.directive('chargeimage', [ChargeImageDirective])

  CommonModule.directive('fileUploader', ['$rootScope', 'events', 'SessionsService', FileUploaderDirective]);

  CommonModule.directive('tweet', ['$window', '$location', TweetDirective]);

  CommonModule.directive('fbShare', ['$window', '$location', FbShareDirective]);

  CommonModule.factory('BaseService', ['$rootScope', '$resource', 'events', BaseService]);

  CommonModule.factory('CkanService', ['$rootScope', '$resource', 'events', CkanService]);

  CommonModule.filter('excerpt', ExcerptFilter);

  CommonModule.filter('noSpace', [NoSpaceFilter]);
});
