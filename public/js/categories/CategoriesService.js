'use strict';

define( function () {
    return function ( BaseService ) {
        var CategoriesService   = new BaseService( 'categories' );

        return CategoriesService;
    };
});