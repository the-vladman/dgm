'use strict';

define( function ( require ) {
    var DatasetsCreateCtrl  = require( 'datasets/DatasetsCreateCtrl' );
    var DatasetsRouter      = require( 'datasets/DatasetsRouter' );
    var DatasetsService     = require( 'datasets/DatasetsService' );

    var DatasetsModule      = angular.module( 'DatasetsModule', []);

    DatasetsModule.config([ '$stateProvider', DatasetsRouter ]);

    DatasetsModule.controller( 'DatasetsCreateCtrl', [ '$scope', 'DatasetsService', DatasetsCreateCtrl ]);

    DatasetsModule.factory( 'DatasetsService', [ 'BaseService', DatasetsService ]);
});