'use strict';

define( function ( require ) {
    var LandingPostsCtrl        = require( 'landing/LandingPostsCtrl' );
    var LandingSearchCtrl       = require( 'landing/LandingSearchCtrl' );
    var LandingSubscribeCtrl    = require( 'landing/LandingSubscribeCtrl' );

    var LandingModule           = angular.module( 'LandingModule', []);

    LandingModule.controller( 'LandingPostsCtrl', [ '$scope', '$element', 'CategoriesService', 'PostsService', LandingPostsCtrl ]);

    LandingModule.controller( 'LandingSearchCtrl', [ '$scope', 'CategoriesService', LandingSearchCtrl ]);

    LandingModule.controller( 'LandingSubscribeCtrl', [ '$scope', LandingSubscribeCtrl ]);
});