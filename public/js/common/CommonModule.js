'use strict';

define( function ( require ) {
    var BaseService         = require( 'common/BaseService' );

    var CommonModule        = angular.module( 'CommonModule', []);

    CommonModule.factory( 'BaseService', [ '$rootScope', '$resource', 'events', BaseService ] );
});