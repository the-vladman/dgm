'use strict';

define( function () {
    return function ( $scope, Posts, Categories, Users ) {
        $scope.post     = {
            name        : '',
            section     : ''
        };
        $scope.sections = Categories.query({
            page        : 1,
            per_page    : 99999,
            select      : 'name',
            type        : 'SECTION'
        });
        $scope.tags     = Categories.query({
            page        : 1,
            per_page    : 99999,
            select      : 'name',
            type        : 'TAG'
        });
        $scope.authors  = Users.query({
            page        : 1,
            per_page    : 9999,
            type        : {
                $gte    : 1
            }
        });

        $scope.create   = function () {
            $scope.post.author  = $scope.post.author.replace( /<br>/g, '' );
            $scope.post.content = $scope.post.content.replace( /<br>/g, '' );
            $scope.post.name    = $scope.post.name.replace( /<br>/g, '' );
            $scope.post.slug    = $scope.post.name.replace( / /g, '-' ).toLowerCase();
            
            Posts.create( $scope.post );
        };

        $scope.$on( Posts.getEvent( 'CREATED' ), function () {
            $scope.$state.go( 'posts.list' );
        });
        $scope.$on( 'POST_SAVE', function () {
            $scope.create();
        });
        $scope.$watch( 'post.section', function ( section ) {
            if ( section ) {
                $scope.categories   = Categories.query({
                    page        : 1,
                    per_page    : 99999,
                    section     : section,
                    select      : 'name',
                    type        : 'CATEGORY'
                });
            }
        });

        if ( $scope.user.type > 1 ) {
            $scope.post.created_by  = $scope.user._id;
        }
    };
});