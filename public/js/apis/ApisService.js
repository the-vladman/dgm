'use strict';

define( function () {
    return function ( BaseService ) {
        var ApisService = new BaseService( 'apis' );

        return ApisService;
    };
});