'use strict';

define( function () {
    var events  = angular.module( 'events', []);

    events.constant( 'events', {
        LOGIN_ERROR             : 'login.error',
        LOGIN_SUCCESS           : 'login.success',
        LOGOUT_ERROR            : 'logout.error',
        LOGOUT_SUCCESS          : 'logout.success',
        SYSTEM_MESSAGE          : 'system.message'
    });
});