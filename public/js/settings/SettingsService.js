'use strict';

define( function () {
    return function ( BaseService ) {
        var SettingsService   = new BaseService( 'settings' );

        return SettingsService;
    };
});
