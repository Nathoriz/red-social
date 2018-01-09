$(document).ready(function() {
  iPerfil = $('#perfil');
  iHome = $('#home');
  iSearch = $('#search');
  iNoti = $('#notifi');
  search = $('.search-box')

  $('.modal').modal();
  
  iPerfil.on('click',function() {
    $('.ide2').addClass('hide');
    search.addClass('hide');
    $('.ide1').removeClass('hide');
  
  })
  iHome.on('click',function() {
    $('.ide1').addClass('hide');
    $('.ide2').addClass('hide');
    search.addClass('hide');
    $('.ide3').removeClass('hide');
  
  })
  
  iSearch.on('click', function() {
    $('.ide1').addClass('hide');
    $('.ide2').addClass('hide');
    search.removeClass('hide');
  })

  iNoti.on('click',function() {
    $('.ide2').removeClass('hide');
    $('.ide1').addClass('hide');
    search.addClass('hide');
  })
| 
  $('.friend').on('click', function() {
    alert('dsjgf');
  })


})
