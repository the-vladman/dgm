'use strict';

define( function ( require ) {
    var UsersService        = require( 'users/UsersService' );

    var UsersModule         = angular.module( 'UsersModule', []);

    UsersModule.factory( 'UsersService', [ 'BaseService', UsersService ]);
});