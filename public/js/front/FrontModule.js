'use strict';

define( function ( require ) {
    var FrontController     = require( 'front/FrontController' );
    var FrontRouter         = require( 'front/FrontRouter' );

    var FrontModule         = angular.module( 'FrontModule', []);

    FrontModule.config([ '$stateProvider', FrontRouter ]);

    FrontModule.controller( 'FrontCtrl', [ FrontController ] );
});