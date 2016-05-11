'use strict';

define( function ( require ) {
    var CategoriesBaseCtrl      = require( 'categories/CategoriesBaseCtrl' );
    var CategoriesCreateCtrl    = require( 'categories/CategoriesCreateCtrl' );
    var CategoriesListCtrl      = require( 'categories/CategoriesListCtrl' );
    var CategoriesRouter        = require( 'categories/CategoriesRouter' );
    var CategoriesService       = require( 'categories/CategoriesService' );

    var CategoriesModule        = angular.module( 'CategoriesModule', []);

    CategoriesModule.config([ '$stateProvider', CategoriesRouter ]);

    CategoriesModule.controller( 'CategoriesBaseCtrl', [ '$scope', CategoriesBaseCtrl ]);

    CategoriesModule.controller( 'CategoriesCreateCtrl', [ '$scope', 'CategoriesService', CategoriesCreateCtrl ]);

    CategoriesModule.controller( 'CategoriesListCtrl', [ '$scope', 'CategoriesService', CategoriesListCtrl ]);

    CategoriesModule.factory( 'CategoriesService', [ 'BaseService', CategoriesService ]);
});