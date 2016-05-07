'use strict';

define( function ( require ) {
    var LandingDataCtrl         = require( 'landing/LandingDataCtrl' );
    var LandingSearchCtrl       = require( 'landing/LandingSearchCtrl' );
    var LandingSubscribeCtrl    = require( 'landing/LandingSubscribeCtrl' );

    var LandingModule           = angular.module( 'LandingModule', []);

    LandingModule.controller( 'LandingDataCtrl', [ '$scope', 'CkanService', LandingDataCtrl ]);

    LandingModule.controller( 'LandingSearchCtrl', [ '$scope', LandingSearchCtrl ]);

    LandingModule.controller( 'LandingSubscribeCtrl', [ '$scope', LandingSubscribeCtrl ]);
});