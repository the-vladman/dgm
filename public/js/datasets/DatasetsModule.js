'use strict';

define( function ( require ) {
    var DatasetsRouter      = require( 'datasets/DatasetsRouter' );

    var DatasetsModule      = angular.module( 'DatasetsModule', []);

    DatasetsModule.config([ '$stateProvider', DatasetsRouter ]);
});