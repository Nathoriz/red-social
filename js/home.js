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
  containerPost = $('.container-post');

  btnPost.on('click', function() {
    if (textPost.val() !== '') {
      var message = $('<p/>');
      var contMsg = $('<div/>');
      var card = $('<div/>');
      var cardImg = $('<div/>');
      var userImage = $('<img/>');
      var name = $('<span/>');
      contMsg.addClass('card-content');
      message.text(textPost.val());
      message.appendTo(contMsg);
      card.addClass('card');
      contMsg.appendTo(card);
      cardImg.addClass('card-image');
      userImage.attr('src', 'http://scriboeditorial.com/wp-content/uploads/2015/03/sa_1425548456Mi%20chica%20ideal-583x583.jpg');
      userImage.appendTo(cardImg);
      name.addClass('card-title');
      name.text('Amalia Burn');
      name.appendTo(cardImg);
      cardImg.appendTo(card);
      card.appendTo(containerPost);
      textPost.val('');
    }
  });
});
