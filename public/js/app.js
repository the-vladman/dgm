'use strict';

define( function ( require ) {
    require( 'events' );
    require( 'admin/AdminModule' );
    require( 'categories/CategoriesModule' );
    require( 'common/CommonModule' );
    require( 'data/DataModule' );
    require( 'front/FrontModule' );
    require( 'landing/LandingModule' );
    require( 'posts/PostsModule' );
    require( 'sessions/SessionsModule' );
    require( 'users/UsersModule' );

    var app     = angular.module( 'dgm', [
            'angular-medium-editor',
            'events',
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ui.bootstrap.pagination',
            'ui.bootstrap.tooltip',
            'ui.bootstrap.tpls',
            'ui.router',
            'AdminModule',
            'CategoriesModule',
            'CommonModule',
            'DataModule',
            'FrontModule',
            'LandingModule',
            'PostsModule',
            'SessionsModule',
            'UsersModule'
        ]);

    app.config( [ '$locationProvider', '$httpProvider', function ( $locationProvider, $httpProvider ) {
        $locationProvider.html5Mode( true );

        $httpProvider.interceptors.push( [ '$rootScope', '$cookies', function ( $rootScope, $cookies ) {
            return {
                request     : function( config ) {
                    var api = ( config.url.indexOf( 'cms-api' ) != -1 ) ? true : false;

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