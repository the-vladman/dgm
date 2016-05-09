'use strict';

define( function ( require ) {
    var ContentBaseCtrl     = require( 'content/ContentBaseCtrl' );
    var ContentRouter       = require( 'content/ContentRouter' );

    var ContentModule       = angular.module( 'ContentModule', []);

    ContentModule.config([ '$stateProvider', ContentRouter ]);

    ContentModule.controller( 'ContentBaseCtrl', [ '$scope', ContentBaseCtrl ]);
});