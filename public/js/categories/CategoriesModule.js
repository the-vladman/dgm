'use strict';

define( function ( require ) {
    var CategoriesService       = require( 'categories/CategoriesService' );

    var CategoriesModule        = angular.module( 'CategoriesModule', []);

    CategoriesModule.factory( 'CategoriesService', [ 'BaseService', CategoriesService ]);
});