'use strict';

define( function ( require ) {
    var LandingDataSearchCtrl   = require( 'landing/LandingDataSearchCtrl' );

    var LandingModule           = angular.module( 'LandingModule', []);

    LandingModule.controller( 'LandingDataSearchCtrl', [ '$scope', LandingDataSearchCtrl ]);
});