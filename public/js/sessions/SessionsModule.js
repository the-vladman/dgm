'use strict';

define( function ( require ) {
    var SessionsRouter      = require( 'sessions/SessionsRouter' );
    var SessionsStartCtrl   = require( 'sessions/SessionsStartCtrl' );
    var SessionsService     = require( 'sessions/SessionsService' );

    var SessionsModule      = angular.module( 'SessionsModule', []);

    SessionsModule.config([ '$stateProvider', SessionsRouter ]);

    SessionsModule.controller( 'SessionsStartCtrl', [ '$scope', 'SessionsService', SessionsStartCtrl ]);

    SessionsModule.factory( 'SessionsService', [ '$rootScope', '$resource', '$cookies', 'events', SessionsService ] );
});