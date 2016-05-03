'use strict';

define( function () {
    var app     = angular.module( 'dgm', [
            'ui.router'
        ]);

    app.config( [ '$locationProvider', function ( $locationProvider ) {
        $locationProvider.html5Mode( true );
    }]);

    return app;
});