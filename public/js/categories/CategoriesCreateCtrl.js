'use strict';

define( function () {
    return function ( $scope, Categories ) {
        $scope.category = {
            name        : ''
        };
        $scope.create   = function () {
            Categories.create( $scope.category );
        };
        $scope.sections = Categories.query({
            page        : 1,
            per_page    : 9999,
            type        : 'SECTION'
        });

        $scope.$on( 'CREATE_CATEGORY', function () {
            $scope.create();
        });
        $scope.$on( Categories.getEvent( 'CREATED' ), function () {
            $scope.$state.go( 'content.summary' );
        });
        $scope.$watch( 'category.name', function ( name ) {
            $scope.category.slug    = $scope.category.name.replace( / /g, '-' ).toLowerCase();
        });
    };
});