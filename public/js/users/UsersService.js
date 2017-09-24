'use strict';

define(function() {
  return function(BaseService) {
    var UsersService = new BaseService('users');

    return UsersService;
  };
});
