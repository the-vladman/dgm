'use strict';

define( function ( require ) {
    var SessionsService     = require( 'sessions/SessionsService' );

    var SessionsModule      = angular.module( 'SessionsModule', []);

    SessionsModule.factory( 'SessionsService', [ '$rootScope', '$resource', '$cookies', 'events', SessionsService ] );
});