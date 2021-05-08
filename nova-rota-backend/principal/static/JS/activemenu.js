//
//
//
// TELA DE CARREGAMENTO
$(window).on("load", function () {
  $(".loader-wrapper").fadeOut("slow");
});

$(document).ajaxStart(function () {
  $(".loader-wrapper").show();
});

$(document).ajaxStop(function () {
  $(".loader-wrapper").hide();
});
//
// ---------------

function MenuAtivo() {
  $("[data-load-page]").unbind("click");
  $("[data-load-page]").click(function () {
    var page = $(this).attr("data-load-page");
    if (!$(this).find("a").hasClass("mm-active")) {
      $("#conteudo").load(page);
    }

    $(".vertical-nav-menu li a").removeClass("mm-active");
    $(this).find("a").addClass("mm-active");
  });
}


