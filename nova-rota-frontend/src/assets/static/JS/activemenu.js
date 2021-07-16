//
//
//
// TELA DE CARREGAMENTO
$(window).on("load", function () {
  $(".loader-wrapper").fadeOut("slow");
  $('form').each(function () {
    this.reset();
  });
});

$(document).ajaxStart(function () {
  $(".loader-wrapper").show();
});

$(document).ajaxStop(function () {
  $(".loader-wrapper").hide();
});
//
// ---------------

window.onload = function () {
 $('[routerLink]').click(function () {
      $('.vertical-nav-menu li a').removeClass('mm-active');
      $(this).find('a').addClass('mm-active');
    });
}


