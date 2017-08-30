'use strict';

define(function() {
  return function(BaseService) {
    var PostsService = new BaseService('posts');

    return PostsService;
  };
});
