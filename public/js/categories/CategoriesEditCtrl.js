'use strict';

define( function () {
    return function ( $scope, $stateParams, Categories ) {
        $scope.category     = Categories.get( $stateParams.id, true );
        $scope.sections     = Categories.query({
            page        : 1,
            per_page    : 9999,
            type        : 'SECTION'
        });
        $scope.create       = function () {
            Categories.update( $stateParams.id, $scope.category );
        };

        $scope.$on( Categories.getEvent( 'DELETED' ), function () {
            $scope.$state.go( 'categories.list' );
        });
        $scope.$on( Categories.getEvent( 'UPDATED' ), function () {
            $scope.$state.go( 'categories.list' );
        });
        $scope.$on( 'REMOVE_CATEGORY', function () {
            Categories.remove( $stateParams.id );
        });
        $scope.$on( 'UPDATE_CATEGORY', function () {
            $scope.create();
        });
        $scope.$watch( 'category.name', function ( name ) {
            $scope.category.slug    = $scope.category.name.replace( / /g, '-' ).toLowerCase();
        });
    };
});