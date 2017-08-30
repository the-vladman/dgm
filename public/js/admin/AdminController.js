'use strict';

define(function() {
  return function($rootScope, Sessions) {
    $('body').addClass('admin').removeClass('front');
    console.log('$rootScope jsj', $rootScope);
    $rootScope.user = Sessions.getUser();
  };
});
