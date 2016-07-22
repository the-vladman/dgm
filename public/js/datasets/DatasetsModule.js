'use strict';

define( function ( require ) {
    var DatasetsCreateCtrl  = require( 'datasets/DatasetsCreateCtrl' );
    var DatasetsEditCtrl    = require( 'datasets/DatasetsEditCtrl' );
    var DatasetsListCtrl    = require( 'datasets/DatasetsListCtrl' );
    var DatasetsRouter      = require( 'datasets/DatasetsRouter' );
    var DatasetsService     = require( 'datasets/DatasetsService' );

    var DatasetsModule      = angular.module( 'DatasetsModule', []);

    DatasetsModule.config([ '$stateProvider', DatasetsRouter ]);

    DatasetsModule.controller( 'DatasetsCreateCtrl', [ '$scope', 'DatasetsService', DatasetsCreateCtrl ]);

    DatasetsModule.controller( 'DatasetsEditCtrl', [ '$scope', '$stateParams', 'DatasetsService', DatasetsEditCtrl ]);

    DatasetsModule.controller( 'DatasetsListCtrl', [ '$scope', 'DatasetsService', DatasetsListCtrl ]);

    DatasetsModule.factory( 'DatasetsService', [ 'BaseService', DatasetsService ]);
});