'use strict';

define( function ( require ) {
    require( 'front/FrontModule' );

    var app     = angular.module( 'dgm', [
            'ui.router',
            'FrontModule'
        ]);

    app.config( [ '$locationProvider', function ( $locationProvider ) {
        $locationProvider.html5Mode( true );
    }]);

    return app;
});