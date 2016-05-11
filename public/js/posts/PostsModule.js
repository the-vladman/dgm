'use strict';

define( function ( require ) {
    var PostsBaseCtrl       = require( 'posts/PostsBaseCtrl' );
    var PostsCreateCtrl     = require( 'posts/PostsCreateCtrl' );
    var PostsEditCtrl       = require( 'posts/PostsEditCtrl' );
    var PostsListCtrl       = require( 'posts/PostsListCtrl' );
    var PostsRouter         = require( 'posts/PostsRouter' );
    var PostsService        = require( 'posts/PostsService' );

    var PostsModule         = angular.module( 'PostsModule', []);

    PostsModule.config([ '$stateProvider', PostsRouter ]);

    PostsModule.controller( 'PostsBaseCtrl', [ '$scope', PostsBaseCtrl ]);

    PostsModule.controller( 'PostsCreateCtrl', [ '$scope', 'PostsService', 'CategoriesService', 'UsersService', PostsCreateCtrl ]);

    PostsModule.controller( 'PostsEditCtrl', [ '$scope', '$stateParams', 'PostsService', 'CategoriesService', 'UsersService', PostsEditCtrl ]);

    PostsModule.controller( 'PostsListCtrl', [ '$scope', 'PostsService', PostsListCtrl ]);

    PostsModule.factory( 'PostsService', [ 'BaseService', PostsService ]);
});