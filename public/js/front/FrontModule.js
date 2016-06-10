'use strict';

define( function ( require ) {
    var FrontController     = require( 'front/FrontController' );
    var FrontPopupCtrl      = require( 'front/FrontPopupCtrl' );
    var FrontPostsCtrl      = require( 'front/FrontPostsCtrl' );
    var FrontRouter         = require( 'front/FrontRouter' );

    var FrontModule         = angular.module( 'FrontModule', []);

    FrontModule.config([ '$stateProvider', FrontRouter ]);

    FrontModule.controller( 'FrontCtrl', [ '$cookies', '$uibModal', FrontController ] );

    FrontModule.controller( 'FrontPopupCtrl', [ '$scope', '$cookies', '$uibModalInstance', FrontPopupCtrl ]);

    FrontModule.controller( 'FrontPostsCtrl', [ '$scope', '$element', '$stateParams', 'CategoriesService', 'PostsService', FrontPostsCtrl ]);
});