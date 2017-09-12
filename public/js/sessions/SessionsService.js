'use strict';

define(function() {
  return function($rootScope, $resource, $cookies, events, Users) {
    return {
      _user: null,

      _resource: $resource('cms-api/sessions/:id'),

      _getUser: function(loggingIn) {
        var that = this;

        $rootScope.$on(events.USERS_RETRIEVED, function() {
          if (loggingIn) {
            loggingIn = false;
            $rootScope.$broadcast(events.LOGIN_SUCCESS);
          }
        });

        this._user = Users.get(this.getUserId());
        return this._user;
      },

      isLoggedIn: function() {
        return $cookies.getObject('session') ? true : false;
      },

      getAccess: function() {
        var session = $cookies.getObject('session');
        return (session) ? session.level : null;
      },

      getToken: function() {
        var session = $cookies.getObject('session');
        return session ? session.token : null;
      },

      getUser: function() {
        return (this._user != null) ? this._user : this._getUser();
      },

      getUserId: function() {
        var session = $cookies.getObject('session');
        return session ? session.user_id : null;
      },

      start: function(credentials) {
        var that = this;

        return this._resource.save(credentials,
          function(data) {
            while (!data.$resolved) {
              // Resolving
            }

            $cookies.putObject('session', {
              token: data.session,
              user_id: data.user_id,
              level: data.access_level
            });

            that._getUser(true);
          },
          function() {
            $rootScope.$broadcast(events.LOGIN_ERROR);
          });
      },

      terminate: function(token) {
        return this._resource.delete({
            id: token
          },
          function(data) {
            while (!data.$resolved) {
              // Resolving
            }

            $cookies.remove('session');
            $rootScope.$broadcast(events.LOGOUT_SUCCESS);
          },
          function() {
            $rootScope.$broadcast(events.LOGOUT_ERROR);
          });
      }
    };
  };
});
