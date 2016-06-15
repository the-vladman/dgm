'use strict';

define( function () {
    return function ( $scope, $stateParams, events, Posts, Categories, Users ) {
        var uploading       = false;

        $scope.configCover  = {
            fileName        : 'cover_photo',
            url             : 'cms-api/posts'
        };
        $scope.configGrid   = {
            fileName        : 'grid_photo',
            url             : 'cms-api/posts'
        };
        $scope.dpOpen       = false;
        $scope.dpOptions    = {
            showWeeks       : false
        };
        $scope.post     = Posts.get( $stateParams.id, true );
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

        $scope.update   = function () {
            $scope.post.author  = $scope.post.author.replace( /<br>/g, '' );
            $scope.post.content = $scope.post.content.replace( /<br>/g, '' );
            $scope.post.name    = $scope.post.name.replace( /<br>/g, '' );
            $scope.post.section = $scope.post.section._id;
            $scope.post.slug    = slug( $scope.post.name, {
                lower   : true
            });

            if ( !uploading ) {
                delete $scope.post.cover_photo;
                delete $scope.post.grid_photo;
            }

            Posts.update( $stateParams.id, $scope.post );
        };
        $scope.open     = function () {
            $scope.dpOpen   = true;
        };

        $scope.$on( events.FILEUPLOADER_DONE, function ( e, data ) {
            $scope.post[ Object.keys( data )[0] ]   = data[ Object.keys( data )[0] ];

            uploading   = true;
            $scope.update();
        });
        $scope.$on( Posts.getEvent( 'RETRIEVED' ), function () {
            $scope.post.creation_date   = new Date( $scope.post.creation_date );
            if ( !$scope.post.datasets || $scope.post.datasets.length == 0 ) {
                $scope.post.datasets    = [ '' ];
            }
        });
        $scope.$on( Posts.getEvent( 'DELETED' ), function ( e, data ) {
            $scope.$state.go( 'posts.list' );
        });
        $scope.$on( Posts.getEvent( 'UPDATED' ), function ( e, data ) {
            if ( !uploading ) {
                $scope.$state.go( 'posts.list' );
            } else {
                $scope.post.cover_photo = data.cover_photo;
                $scope.post.grid_photo  = data.grid_photo;
                uploading   = false;
            }
        });
        $scope.$on( 'POST_REMOVE', function () {
            Posts.remove( $stateParams.id );
        });
        $scope.$on( 'POST_UPDATE', function () {
            $scope.update();
        });
        $scope.$watch( 'post.section', function ( section ) {
            if ( section ) {
                $scope.categories   = Categories.query({
                    page        : 1,
                    per_page    : 99999,
                    section     : section._id,
                    select      : 'name',
                    type        : 'CATEGORY'
                });
            }
        });
    };
});