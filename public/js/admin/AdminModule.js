'use strict';

define( function ( require ) {
    var AdminController     = require( 'admin/AdminController' );
    var AdminExportCtrl     = require( 'admin/AdminExportCtrl' );
    var AdminRouter         = require( 'admin/AdminRouter' );
    var CollectionsService  = require( 'admin/CollectionsService' );

    var AdminModule         = angular.module( 'AdminModule', []);

    AdminModule.config([ '$stateProvider', AdminRouter ]);

    AdminModule.controller( 'AdminCtrl', [ '$rootScope', 'SessionsService', AdminController ] );

    AdminModule.controller( 'AdminExportCtrl', [ '$scope', 'CollectionsService', AdminExportCtrl ]);

    AdminModule.factory( 'CollectionsService', [ '$rootScope', '$resource', CollectionsService ]);
});