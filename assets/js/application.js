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

});