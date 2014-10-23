function pathExist(name) {
  for (var i = list.length - 1; i >= 0; i--) {
    if ( list[i].name === name ) {
      return list[i];
    };
  };
  
  return false;
}

var list = [
      {
        name: '/xalapa',
        url: 'http://catalogo.datos.gob.mx/organization/ayuntamiento-de-xalapa'
      },
      {
        name: '/datatron',
        url: 'http://datatron.herokuapp.com/'
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
