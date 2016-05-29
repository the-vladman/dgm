'use strict';

define( function ( require ) {
    var CategoriesBaseCtrl      = require( 'categories/CategoriesBaseCtrl' );
    var CategoriesCreateCtrl    = require( 'categories/CategoriesCreateCtrl' );
    var CategoriesEditCtrl      = require( 'categories/CategoriesEditCtrl' );
    var CategoriesExtraCtrl     = require( 'categories/CategoriesExtraCtrl' );
    var CategoriesHeaderCtrl    = require( 'categories/CategoriesHeaderCtrl' );
    var CategoriesListCtrl      = require( 'categories/CategoriesListCtrl' );
    var CategoriesRouter        = require( 'categories/CategoriesRouter' );
    var CategoriesService       = require( 'categories/CategoriesService' );

    var CategoriesModule        = angular.module( 'CategoriesModule', []);

    CategoriesModule.config([ '$stateProvider', CategoriesRouter ]);

    CategoriesModule.controller( 'CategoriesBaseCtrl', [ '$scope', CategoriesBaseCtrl ]);

    CategoriesModule.controller( 'CategoriesCreateCtrl', [ '$scope', 'events', 'CategoriesService', CategoriesCreateCtrl ]);

    CategoriesModule.controller( 'CategoriesEditCtrl', [ '$scope', '$stateParams', 'events', 'CategoriesService', CategoriesEditCtrl ]);

    CategoriesModule.controller( 'CategoriesExtraCtrl', [ '$scope', '$stateParams', 'CategoriesService', CategoriesExtraCtrl ]);

    CategoriesModule.controller( 'CategoriesHeaderCtrl', [ '$scope', '$stateParams', 'CategoriesService', CategoriesHeaderCtrl ]);

    CategoriesModule.controller( 'CategoriesListCtrl', [ '$scope', 'CategoriesService', CategoriesListCtrl ]);

    CategoriesModule.factory( 'CategoriesService', [ 'BaseService', CategoriesService ]);
});