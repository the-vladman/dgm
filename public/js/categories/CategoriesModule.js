'use strict';

define( function ( require ) {
    var CategoriesCreateCtrl    = require( 'categories/CategoriesCreateCtrl' );
    var CategoriesService       = require( 'categories/CategoriesService' );

    var CategoriesModule        = angular.module( 'CategoriesModule', []);

    CategoriesModule.controller( 'CategoriesCreateCtrl', [ '$scope', 'CategoriesService', CategoriesCreateCtrl ]);

    CategoriesModule.factory( 'CategoriesService', [ 'BaseService', CategoriesService ]);
});