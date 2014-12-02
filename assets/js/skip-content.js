$(function() {
  $("a[href^='#']").click(function() {
    var destination = $(this).attr("href");
    $(destination).focus();
  });
});