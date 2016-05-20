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
            $scope.posts    = Posts.query({
                expanded    : true,
                name        : $scope.search.keyword,
                page        : $scope.page,
                per_page    : $scope.per_page,
                section     : $stateParams.section_id,
                status      : 'PUBLISHED',
                tag         : $scope.search.tag
            });
        };

        if ( $stateParams.section_id ) {
            $scope.query();
        } else {
            Categories.query({
                page        : 1,
                per_page    : 1,
                select      : 'name',
                slug        : $scope.section,
                type        : 'SECTION'
            }).$promise.then( function ( data ) {
                $stateParams.section_id     = data[0]._id;
                $scope.query();
            });
        }
    };
});