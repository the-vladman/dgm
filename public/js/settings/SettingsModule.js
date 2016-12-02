'use strict';

define( function ( require ) {
    var SettingsBaseCtrl      = require( 'settings/SettingsBaseCtrl' );
    var SettingsEditCtrl      = require( 'settings/SettingsEditCtrl' );
    var SettingsRouter        = require( 'settings/SettingsRouter' );
    var SettingsService       = require( 'settings/SettingsService' );

    var SettingsModule        = angular.module( 'SettingsModule', []);

    SettingsModule.config([ '$stateProvider', SettingsRouter ]);

    SettingsModule.controller( 'SettingsBaseCtrl', [ '$scope', SettingsBaseCtrl ]);

    SettingsModule.controller( 'SettingsEditCtrl', [ '$scope', '$stateParams', 'events', 'SettingsService', SettingsEditCtrl ]);

    SettingsModule.factory( 'SettingsService', [ 'BaseService', SettingsService ]);
});
