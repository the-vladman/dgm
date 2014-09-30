$(function() {

  $('.slider').bxSlider({
    autoHover: true,
    pager: false,
    controls: true,
    auto: true,
    pause: 4000,
    pager: false,
    nextText: '',
    prevText: '',
    nextSelector: $('.slider-button.next'),
    prevSelector: $('.slider-button.prev'),
    speed: 800
  });


  $('.nav-burguer').on('click', function(e) {
    var self = $(this),
        nav = $('.site-navigation');

    if ( self.hasClass('active') ) {
      self.removeClass('active');
      nav.slideUp(400);
    } else {
      self.addClass('active');
      nav.slideDown(400);
    };
  });

  $(window).resize(function(event) {
    var nav = $('.site-navigation'),
        burguer = $('.nav-burguer'),
        windowWidth = $(window).width();

    if ( windowWidth > 640 ) {
      burguer.removeClass('active')
      nav.show();
    } else if ( windowWidth < 640 && !burguer.hasClass('active') ) {
      nav.hide()
    }
  });
});