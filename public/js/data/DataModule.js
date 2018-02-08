'use strict';

define( function ( require ) {
    var DataLoadCtrl    = require( 'data/DataLoadCtrl' );

    var DataModule      = angular.module( 'DataModule', []);

    DataModule.controller( 'DataLoadCtrl', [ '$scope', '$stateParams', 'CkanService', 'DatasetsService', 'ApisService', DataLoadCtrl ]);
});