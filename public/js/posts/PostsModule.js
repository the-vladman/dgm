'use strict';

define( function ( require ) {
    var PostsBaseCtrl       = require( 'posts/PostsBaseCtrl' );
    var PostsCreateCtrl     = require( 'posts/PostsCreateCtrl' );
    var PostsRouter         = require( 'posts/PostsRouter' );
    var PostsService        = require( 'posts/PostsService' );

    var PostsModule         = angular.module( 'PostsModule', []);

    PostsModule.config([ '$stateProvider', PostsRouter ]);

    PostsModule.controller( 'PostsBaseCtrl', [ '$scope', PostsBaseCtrl ]);

    PostsModule.controller( 'PostsCreateCtrl', [ '$scope', 'PostsService', 'CategoriesService', 'UsersService', PostsCreateCtrl ]);

    PostsModule.factory( 'PostsService', [ 'BaseService', PostsService ]);
});