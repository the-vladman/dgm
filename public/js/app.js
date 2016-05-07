'use strict';

define( function ( require ) {
    require( 'events' );
    require( 'admin/AdminModule' );
    require( 'common/CommonModule' );
    require( 'content/ContentModule' );
    require( 'front/FrontModule' );
    require( 'landing/LandingModule' );
    require( 'sessions/SessionsModule' );
    require( 'users/UsersModule' );

    var app     = angular.module( 'dgm', [
            'events',
            'ngCookies',
            'ngResource',
            'ui.router',
            'AdminModule',
            'CommonModule',
            'ContentModule',
            'FrontModule',
            'LandingModule',
            'SessionsModule',
            'UsersModule'
        ]);

    app.config( [ '$locationProvider', '$httpProvider', function ( $locationProvider, $httpProvider ) {
        $locationProvider.html5Mode( true );

        $httpProvider.interceptors.push( [ '$rootScope', '$cookies', function ( $rootScope, $cookies ) {
            return {
                request     : function( config ) {
                    var api = ( config.url.indexOf( 'api' ) != -1 ) ? true : false;

                    if ( api ) {
                        var holder  = '';

                        if ( config.method == "DELETE" || config.method == "GET" ) {
                            holder  = 'params';
                        } else {
                            holder  = 'data';
                        }
                        // Append the application signature to the api request
                        if ( config[holder] === undefined || config[holder] === null ) {
                            config[holder]   = {};
                        }

                        var session = $cookies.getObject( 'session' );
                        if ( session ) {
                            config[holder].session   = session.token;
                        }
                    }

                    return config;
                }
            };
        }]);
    }]);

    app.run([ '$rootScope', '$state', function ( $rootScope, $state ) {
        $rootScope.$state   = $state;
    }]);

    return app;
});