$(document).ready(function() {
  // Enfoca input de chat
  $('.area-chat').focus();
  
  // mensajes del chat
  chatBox = $('.chat-box');
  areaChat = $('.area-chat');
  btnSend = $('.send');

  btnSend.on('click', function() {
    if (areaChat.val() !== '') {
      var text = $('<p/>');
      text.text(areaChat.val());
      var box = $('<div/>');
      box.addClass('msg');
      text.appendTo(box);
      var lastbox = $('<li/>');
      lastbox.addClass('self');
      box.appendTo(lastbox);
      lastbox.appendTo(chatBox);
      var boxPic = $('<div/>');
      boxPic.addClass('avatar');
      boxPic.appendTo(lastbox);
      var pic = $('<img/>');
      pic.attr('src', 'http://scriboeditorial.com/wp-content/uploads/2015/03/sa_1425548456Mi%20chica%20ideal-583x583.jpg');
      pic.appendTo(boxPic);
      // areaChat.val();
    }
  });
});