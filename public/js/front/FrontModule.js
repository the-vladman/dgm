'use strict';

define( function ( require ) {
    var FrontController     = require( 'front/FrontController' );
    var FrontPostsCtrl      = require( 'front/FrontPostsCtrl' );
    var FrontRouter         = require( 'front/FrontRouter' );

    var FrontModule         = angular.module( 'FrontModule', []);

    FrontModule.config([ '$stateProvider', FrontRouter ]);

    FrontModule.controller( 'FrontCtrl', [ FrontController ] );

    FrontModule.controller( 'FrontPostsCtrl', [ '$scope', '$element', '$stateParams', 'CategoriesService', 'PostsService', FrontPostsCtrl ]);
});