'use strict';

define( function () {
    return function ( $scope, $stateParams, Posts ) {
        $scope.page     = 1;
        $scope.per_page = 10;
        $scope.query    = function () {
            $scope.posts    = Posts.query({
                expanded    : true,
                page        : $scope.page,
                per_page    : $scope.per_page,
                section     : $stateParams.section_id,
                status      : 'PUBLISHED'
            });
        };
        $scope.section  = $stateParams.section;

        $scope.query();
    };
});