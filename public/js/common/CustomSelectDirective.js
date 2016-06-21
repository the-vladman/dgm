'use strict';

define( function () {
    return function ( $timeout ) {
        return {
            restrict    : 'EA',
            link        : function ( scope, element ) {
                $timeout( function () {
                    element.selectpicker();
                });
            }
        };
    };
});