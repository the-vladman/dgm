'use strict';

define( function () {
    return function () {
        return function ( value ) {
            var paragraph   = value.match( /<p[^>]*>(.*?)<\/p>/ )[1];

            return paragraph.replace( /(<([^>]+)>)/ig, '' );
        };
    };
});