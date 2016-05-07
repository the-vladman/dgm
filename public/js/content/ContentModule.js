'use strict';

define( function ( require ) {
    var ContentRouter       = require( 'content/ContentRouter' );

    var ContentModule       = angular.module( 'ContentModule', []);

    ContentModule.config([ '$stateProvider', ContentRouter ]);
});