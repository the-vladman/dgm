'use strict';

define(function() {
  return function($timeout) {
    return {
      restrict: 'EA',
      link: function(scope, element) {
        $timeout(function() {
          element.selectpicker();
        });

        if (scope.options) {
          scope.options.$promise.then(function() {
            $timeout(function() {
              element.selectpicker('refresh');
            });
          });
        }
      }
    };
  };
});
