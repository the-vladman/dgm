$(function() {
  $('.search-data-form-js').submit(function(event) {
    event.preventDefault();

    var form = $(this),
        message = form.find('.message'),
        url = form.attr('action'),
        query = form.find('input[type=text]').val();

    if ( query == "" ) {
      message.addClass('active error').text('Por favor escribe algo en el campo.').attr('aria-hidden', 'false');
      form.find('input[type=text]').focus();
    } else {
      trackSearch(query);
      message.removeClass('active error').text('');
      window.open( url + query ,'_self');
    };
  });
});
