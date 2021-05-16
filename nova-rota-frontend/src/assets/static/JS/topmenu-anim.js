// TAREFAS ANIM

$('#tarefas-bt').on('click', function() {
    $('#tarefas').fadeIn('500');
})

$('#fechar-bt').on('click', function() {
    $('#tarefas').fadeOut('500');
})

// CONFIG ANIM

$('#config-bt').on('click', function() {
    $('#config').fadeIn('500');
})

$('#fechar-bt2').on('click', function() {
    $('#config').fadeOut('500');
})



function SubMenu() {
    $("[data-load-sub]").unbind("click");
    $("[data-load-sub]").click(function () {
      var page = $(this).attr("data-load-page");
      if (!$(this).find("a").hasClass("mm-active")) {
        $("#sub-conteudo").load(page);
      }
    });
  }
  