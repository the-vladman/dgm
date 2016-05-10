'use strict';

define( function ( require ) {
    var PostsService        = require( 'posts/PostsService' );

    var PostsModule         = angular.module( 'PostsModule', []);

    PostsModule.factory( 'PostsService', [ 'BaseService', PostsService ]);
});