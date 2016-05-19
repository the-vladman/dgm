'use strict';

define( function () {
    return function ( $scope, $element, Categories, Posts ) {
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
            slug        : $element.data( 'section' ),
            type        : 'SECTION'
        }).$promise.then( function ( data ) {
            $scope.section_id   = data[0]._id;
            if ( data.length == 1 ) {
                queryPosts( $scope.section_id );
            }
        });
    };
});