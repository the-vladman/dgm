'use strict';

define( function ( require ) {
    var PostsCreateCtrl     = require( 'posts/PostsCreateCtrl' );
    var PostsRouter         = require( 'posts/PostsRouter' );
    var PostsService        = require( 'posts/PostsService' );

    var PostsModule         = angular.module( 'PostsModule', []);

    PostsModule.config([ '$stateProvider', PostsRouter ]);

    PostsModule.controller( 'PostsCreateCtrl', [ '$scope', 'PostsService', 'CategoriesService', PostsCreateCtrl ]);

    PostsModule.factory( 'PostsService', [ 'BaseService', PostsService ]);
});