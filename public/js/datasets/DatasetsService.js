'use strict';

define( function () {
    return function ( BaseService ) {
        var DatasetsService = new BaseService( 'datasets' );

        return DatasetsService;
    };
});