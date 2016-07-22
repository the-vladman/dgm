'use strict';

define( function ( require ) {
    var DatasetsRouter      = require( 'datasets/DatasetsRouter' );
    var DatasetsService     = require( 'datasets/DatasetsService' );

    var DatasetsModule      = angular.module( 'DatasetsModule', []);

    DatasetsModule.config([ '$stateProvider', DatasetsRouter ]);

    DatasetsModule.factory( 'DatasetsService', [ 'BaseService', DatasetsService ]);
});