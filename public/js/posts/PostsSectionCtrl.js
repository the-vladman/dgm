'use strict';

define( function () {
    return function ( $scope, $stateParams, Posts, Categories ) {
        $scope.page     = 1;
        $scope.per_page = 12;
        $scope.search   = {};
        $scope.section  = $stateParams.section;
        $scope.tags     = Categories.query({
            page        : 1,
            per_page    : 9999,
            type        : 'TAG'
        });
        $scope.query    = function () {
            $scope.categories   = Categories.query({
                page        : 1,
                per_page    : 9999,
                section     : $scope.section_id,
                type        : 'CATEGORY'
            });

            $scope.posts        = Posts.query({
                category    : $scope.category_id,
                expanded    : true,
                name        : $scope.search.keyword,
                page        : $scope.page,
                per_page    : $scope.per_page,
                section     : $scope.section_id,
                status      : 'PUBLISHED',
                tag         : $scope.search.tag
            });
        };

        if ( $stateParams.section_id ) {
            $scope.section_id   = $stateParams.section_id;
            $scope.query();
        } else {
            Categories.query({
                page        : 1,
                per_page    : 1,
                select      : 'name',
                slug        : $scope.section,
                type        : 'SECTION'
            }).$promise.then( function ( data ) {
                $scope.section_id   = data[0]._id;
                $scope.query();
            });
        }
        if ( $stateParams.category ) {
            if ( $stateParams.category_id ) {
                $scope.category_id      = $stateParams.category_id;
                $scope.query();
            } else {
                Categories.query({
                    page        : 1,
                    per_page    : 1,
                    select      : 'name',
                    slug        : $stateParams.category,
                    type        : 'CATEGORY'
                }).$promise.then( function ( data ) {
                    $scope.category_id  = data[0]._id;
                    $scope.query();
                });
            }
        }
        if ( $stateParams.tag ) {
            Categories.query({
                per_page    : 1,
                page        : 1,
                slug        : $stateParams.tag,
                type        : 'TAG'
            }).$promise.then( function ( tags ) {
                $scope.search.tag   = tags[0];
                $scope.query();
            });
        }
    };
});