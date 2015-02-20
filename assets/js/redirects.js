function pathExist(name) {
  for (var i = list.length - 1; i >= 0; i--) {
    var item = list[i],
        posibleNames = [ '/' + item.name, '/' + item.name + '/' ];

    if ( _.contains( posibleNames, name ) )
      return item;
  };

  return false;
}

var list = [
      {
        name: 'san-luis-potosi',
        url: 'http://catalogo.datos.gob.mx/organization/ayuntamiento-de-san-luis-potosi/'
      },
      {
        name: 'xalapa',
        url: 'http://catalogo.datos.gob.mx/organization/ayuntamiento-de-xalapa/'
      },
      {
        name: 'datatron',
        url: 'http://datatron.herokuapp.com/'
      },
      {
        name: 'presidencia',
        url: 'http://catalogo.datos.gob.mx/organization/presidencia/'
      },
      {
        name: 'guia',
        url: 'http://mxabierto.github.io/guia/'
      },
      {
        name: 'catalogo',
        url: 'http://mxabierto.github.io/ng-ckan/'
      }
    ],
    dependency  = pathExist( window.location.pathname );

if ( dependency ) {
  $('#redirect-message').show();
  document.title = "Redireccionando...";
  window.location.href = dependency.url;
} else {
  $('#error-content').show();
};
