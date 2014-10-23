function popup( url, title ) {
  window.open(url, title, "width=700, height=350");
}

$(function() {
  $('.custom-share-button').click(function(event) {
    event.preventDefault();
    
    var $self = $(this),
        url = $self.attr('href'),
        title = $self.attr('title');

    popup(url, title);
  });
});