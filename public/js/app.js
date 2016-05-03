'use strict';

define( function ( require ) {
    require( 'admin/AdminModule' );
    require( 'front/FrontModule' );

    var app     = angular.module( 'dgm', [
            'ui.router',
            'AdminModule',
            'FrontModule'
        ]);

    app.config( [ '$locationProvider', function ( $locationProvider ) {
        $locationProvider.html5Mode( true );
    }]);

    return app;
});