'use strict';

define( function ( require ) {
    var UsersAdminCtrl      = require( 'users/UsersAdminCtrl' );
    var UsersRouter         = require( 'users/UsersRouter' );
    var UsersService        = require( 'users/UsersService' );

    var UsersModule         = angular.module( 'UsersModule', []);

    UsersModule.config([ '$stateProvider', UsersRouter ]);

    UsersModule.controller( 'UsersAdminCtrl', [ '$scope', 'UsersService', UsersAdminCtrl ]);

    UsersModule.factory( 'UsersService', [ 'BaseService', UsersService ]);
});