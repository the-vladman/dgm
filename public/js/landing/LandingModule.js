'use strict';

define( function ( require ) {
    var LandingDataCtrl     = require( 'landing/LandingDataCtrl' );
    var LandingSearchCtrl   = require( 'landing/LandingSearchCtrl' );

    var LandingModule       = angular.module( 'LandingModule', []);

    LandingModule.controller( 'LandingDataCtrl', [ '$scope', 'CkanService', LandingDataCtrl ]);

    LandingModule.controller( 'LandingSearchCtrl', [ '$scope', LandingSearchCtrl ]);
});