$(document).ready(function() {
  iProfile = $('#profile');
  iHome = $('#home');
  iSearch = $('#search');
  iNoti = $('#notifi');
  search = $('.search-box');

  // Despliega modales
  $('.modal').modal();
  
  // funciones del navBar
  iProfile.on('click', function() {
    $('.ide1').removeClass('hide');
    $('.ide2').addClass('hide');
    search.addClass('hide');
    $('.ide4').addClass('hide');
  });

  iHome.on('click', function() {
    $('.ide1').addClass('hide');
    $('.ide2').addClass('hide');
    search.addClass('hide');
    $('.ide4').removeClass('hide');
  });
  
  iSearch.on('click', function() {
    $('.ide1').addClass('hide');
    $('.ide2').addClass('hide');
    $('.ide4').addClass('hide');
    search.removeClass('hide');
  });

  iNoti.on('click', function() {
    $('.ide2').removeClass('hide');
    $('.ide1').addClass('hide');
    search.addClass('hide');
    $('.ide4').addClass('hide');
  });

  // redirecciona al chat
  $('.friend').on('click', function() {
    window.location.href = 'chat.html';
  });

  // Postea en el muro
  btnPost = $('.btn-posting');
  textPost = $('.text-posting');
  containerMsg = $('.container-msg');

  btnPost.on('click', function() {
    if (textPost.val() !== '') {
      var message = $('<p/>');
      message.addClass('card-content');
      message.text(textPost.val());
      message.appendTo(containerMsg);
      $('#user-post').removeClass('hide');
      textPost.val('');
    }
  });
});
