'use strict';

define(function() {
  return function($rootScope, $resource) {

    function getFileNameFromHeader(header) {
      if (!header)
        return null;

      var result = header.split(";")[1].trim().split("=")[1];
      return result.replace(/"/g, '');
    }

    return {
      _resource: $resource('cms-api/collections', null, {
        export: {
          cache: false,
          headers: 'application/zip',
          method: 'GET',
          responseType: 'blob',
          transformResponse: function(data, headers) {
            return {
              response: {
                blob: data,
                fileName: getFileNameFromHeader(headers('content-disposition'))
              }
            };
          }
        }
      }),

      export: function(filters) {
        return this._resource.export(filters);
      }
    };
  };
});
