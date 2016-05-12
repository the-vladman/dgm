'use strict';

define( function () {
    return function ( $scope, Categories, Posts ) {
        var queryPosts  = function ( section ) {
            $scope.posts    = Posts.query({
                expanded    : true,
                page        : 1,
                per_page    : 6,
                section     : section,
                status      : 'PUBLISHED'
            });
        };

        Categories.query({
            page        : 1,
            per_page    : 1,
            select      : 'name',
            slug        : 'herramientas',
            type        : 'SECTION'
        }).$promise.then( function ( data ) {
            if ( data.length == 1 ) {
                queryPosts( data[0]._id );
            }
        });
    };
});