function addAriaHiddenAttrs(iframe) {
  iframe.attr({
    'aria-hidden': 'true',
    'tabindex': '-1'
  });
};

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
    speed: 900,
    onSliderLoad: function() {
      $('.slider-button a').attr('tabindex', '-1');
    }
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

  $('.timeago').each(function(index, item) {
    var $self = $(this),
        timestamp = $self.data('timestamp'),
        format = $self.data('timestamp-format'),
        date;
    
    switch (format) {
      case 'normal':
        date = moment(timestamp).format("DD MMM YYYY");
        break;
      case 'timeago':
        date = moment(timestamp, "YYYYMMDD").fromNow();
        break;
    };

    $self.html( date );
  });
  
});