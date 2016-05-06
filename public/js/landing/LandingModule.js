'use strict';

define( function ( require ) {
    var LandingSearchCtrl   = require( 'landing/LandingSearchCtrl' );

    var LandingModule       = angular.module( 'LandingModule', []);

    LandingModule.controller( 'LandingSearchCtrl', [ '$scope', LandingSearchCtrl ]);
});