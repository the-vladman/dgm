'use strict';

define( function ( require ) {
    var FrontRouter     = require( 'front/FrontRouter' );

    var FrontModule     = angular.module( 'FrontModule', []);

    FrontModule.config([ '$stateProvider', FrontRouter ]);
});