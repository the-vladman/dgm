'use strict';

define(function(require) {
  var SessionsEndCtrl = require('sessions/SessionsEndCtrl');
  var SessionsRouter = require('sessions/SessionsRouter');
  var SessionsStartCtrl = require('sessions/SessionsStartCtrl');
  var SessionsService = require('sessions/SessionsService');

  var SessionsModule = angular.module('SessionsModule', []);

  SessionsModule.config(['$stateProvider', SessionsRouter]);

  SessionsModule.controller('SessionsEndCtrl', ['$scope', 'events', 'SessionsService', SessionsEndCtrl]);

  SessionsModule.controller('SessionsStartCtrl', ['$scope', 'events', 'SessionsService', SessionsStartCtrl]);

  SessionsModule.factory('SessionsService', ['$rootScope', '$resource', '$cookies', 'events', 'UsersService', SessionsService]);
});
