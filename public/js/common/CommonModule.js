'use strict';

define( function ( require ) {
    var BaseService         = require( 'common/BaseService' );
    var CkanService         = require( 'common/CkanService' );

    var CommonModule        = angular.module( 'CommonModule', []);

    CommonModule.factory( 'BaseService', [ '$rootScope', '$resource', 'events', BaseService ] );

    CommonModule.factory( 'CkanService', [ '$rootScope', '$resource', 'events', CkanService ]);
});