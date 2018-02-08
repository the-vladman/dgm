'use strict';

define( function ( require ) {
    var ApisBaseCtrl    = require( 'apis/ApisBaseCtrl' );
    var ApisCreateCtrl  = require( 'apis/ApisCreateCtrl' );
    var ApisEditCtrl    = require( 'apis/ApisEditCtrl' );
    var ApisListCtrl    = require( 'apis/ApisListCtrl' );
    var ApisRouter      = require( 'apis/ApisRouter' );
    var ApisService     = require( 'apis/ApisService' );

    var ApisModule      = angular.module( 'ApisModule', []);

    ApisModule.config([ '$stateProvider', ApisRouter ]);

    ApisModule.controller( 'ApisBaseCtrl', [ '$scope', ApisBaseCtrl ]);

    ApisModule.controller( 'ApisCreateCtrl', [ '$scope', 'ApisService', ApisCreateCtrl ]);

    ApisModule.controller( 'ApisEditCtrl', [ '$scope', '$stateParams', 'ApisService', ApisEditCtrl ]);

    ApisModule.controller( 'ApisListCtrl', [ '$scope', 'ApisService', ApisListCtrl ]);

    ApisModule.factory( 'ApisService', [ 'BaseService', ApisService ]);
});