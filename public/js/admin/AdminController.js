'use strict';

define(function() {
  return function($rootScope, Sessions) {
    $('body').addClass('admin').removeClass('front');
    $rootScope.user = Sessions.getUser();
  };
});
