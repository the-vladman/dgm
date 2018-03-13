'use strict';

define(function () {
  return function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('load', function () {
          var loaders = angular.element(document.getElementsByClassName('preloaders'));
          var catego = angular.element(document.getElementsByClassName('categories-list'));

          loaders.addClass('hidden');
          catego.addClass('show');
        });
        element.bind('error', function () {
          alert('image could not be loaded');
        });
      }
    };
  }
});