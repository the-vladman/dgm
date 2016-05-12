'use strict';

define( function ( require ) {
    var LandingBlogCtrl         = require( 'landing/LandingBlogCtrl' );
    var LandingDataCtrl         = require( 'landing/LandingDataCtrl' );
    var LandingSearchCtrl       = require( 'landing/LandingSearchCtrl' );
    var LandingSubscribeCtrl    = require( 'landing/LandingSubscribeCtrl' );
    var LandingToolsCtrl        = require( 'landing/LandingToolsCtrl' );

    var LandingModule           = angular.module( 'LandingModule', []);

    LandingModule.controller( 'LandingBlogCtrl', [ '$scope', 'CategoriesService', 'PostsService', LandingBlogCtrl ]);

    LandingModule.controller( 'LandingDataCtrl', [ '$scope', 'CkanService', LandingDataCtrl ]);

    LandingModule.controller( 'LandingSearchCtrl', [ '$scope', LandingSearchCtrl ]);

    LandingModule.controller( 'LandingSubscribeCtrl', [ '$scope', LandingSubscribeCtrl ]);

    LandingModule.controller( 'LandingToolsCtrl', [ '$scope', 'CategoriesService', 'PostsService', LandingToolsCtrl ]);
});