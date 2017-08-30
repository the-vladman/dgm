'use strict';

define(function() {
  return function($stateProvider) {
    $stateProvider
      .state('admin-login', {
        url: '/login',
        resolve: {
          loginRequired: ['$q', '$state', '$timeout', 'SessionsService', function($q, $state, $timeout, Sessions) {
            if (Sessions.isLoggedIn()) {
              $timeout(function() {
                $state.go('admin');
              });
              return $q.reject('User logged in!');
            }
          }]
        },
        views: {
          application: {
            templateUrl: 'partials/admin/login',
            controller: 'SessionsStartCtrl'
          }
        }
      })
      .state('admin-logout', {
        url: '/logout',
        views: {
          application: {
            template: '',
            controller: 'SessionsEndCtrl'
          }
        }
      });
  };
});
