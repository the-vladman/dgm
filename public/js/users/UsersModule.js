'use strict';

define( function ( require ) {
    var UsersAdminCtrl      = require( 'users/UsersAdminCtrl' );
    var UsersCreateCtrl     = require( 'users/UsersCreateCtrl' );
    var UsersDetailsCtrl    = require( 'users/UsersDetailsCtrl' );
    var UsersRouter         = require( 'users/UsersRouter' );
    var UsersService        = require( 'users/UsersService' );

    var UsersModule         = angular.module( 'UsersModule', []);

    UsersModule.config([ '$stateProvider', UsersRouter ]);

    UsersModule.controller( 'UsersAdminCtrl', [ '$scope', 'UsersService', UsersAdminCtrl ]);

    UsersModule.controller( 'UsersCreateCtrl', [ '$scope', 'UsersService', UsersCreateCtrl ]);

    UsersModule.controller( 'UsersDetailsCtrl', [ '$scope', '$stateParams', 'UsersService', UsersDetailsCtrl ]);

    UsersModule.factory( 'UsersService', [ 'BaseService', UsersService ]);
});