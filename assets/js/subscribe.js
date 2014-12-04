$(function() {

  $('#mc-embedded-subscribe-form').submit(function(event) {
    event.preventDefault();

    var form = $(this),
        message = form.find('.message'),
        email = form.find('#mce-EMAIL');

    if ( email.val() == "" ) {
      message.addClass('active error').text('Por favor ingresa algo en el campo.');
      email.focus();
    } else {
      sendForm(form, message, email);
    }
  });

  function sendForm(form, message, emailField) {
    $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
        cache: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        error: function(err) {
          message.addClass('active error').text('Uups, algo paso que no pudimos registrate, intenta más tarde.')
          emailField.focus();
        },
        success: function(data) {
          if (data.result != "success") {
            message.addClass('active error').text('Al parecer el correo electrónico que ingresaste no existe o es invalido.');
            emailField.focus();
          } else {
            message.addClass('active success').text('Para completar tu registro verifica tu correo electrónico.');
            emailField.val("");
          }
        }
    });
  }
});