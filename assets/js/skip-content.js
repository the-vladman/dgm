$(function() {
  $("a[href^='#']").click(function() {
    var destination = $(this).attr("href").slice(1);

    $("#" + destination ).focus().effect("highlight", {}, 3000);
  });
});