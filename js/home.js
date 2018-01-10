$(document).ready(function() {
  iProfile = $('#profile');
  iHome = $('#home');
  iSearch = $('#search');
  iNoti = $('#notifi');
  search = $('.search-box');
  boxChat = $('.box-chat');

  boxChat.focus();

  $('.modal').modal();
  
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

  $('.friend').on('click', function() {
    window.location.href = 'chat.html';
  });

  // $('.return').on('click', function() {
  //   window.location.href = 'home.html';
  // });
});
