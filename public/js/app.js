'use strict';

define( function ( require ) {
    require( 'events' );
    require( 'admin/AdminModule' );
    require( 'common/CommonModule' );
    require( 'front/FrontModule' );
    require( 'sessions/SessionsModule' );

    var app     = angular.module( 'dgm', [
            'events',
            'ngCookies',
            'ngResource',
            'ui.router',
            'AdminModule',
            'CommonModule',
            'FrontModule',
            'SessionsModule'
        ]);

    app.config( [ '$locationProvider', function ( $locationProvider ) {
        $locationProvider.html5Mode( true );
    }]);

    app.run([ '$rootScope', '$state', function ( $rootScope, $state ) {
        $rootScope.$state   = $state;
    }]);

    return app;
});