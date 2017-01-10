'use strict';

define( function () {
    return function ( $stateProvider ) {
        $stateProvider
            .state( 'settings', {
                abstract    : true,
                parent      : 'admin',
                url         : '/settings',
                views       : {
                    'admin-main'    : {
                        templateUrl : 'partials/settings/base',
                        controller  : 'SettingsBaseCtrl'
                    }
                }
            })
            .state( 'settings.edit', {
                url         : '/edit',
                views       : {
                    'settings-main'   : {
                        templateUrl     : 'partials/settings/edit',
                        controller      : 'SettingsEditCtrl'
                    }
                }
            });
    };
});
