iPerfil = $('#perfil');
iHome = $('#home');
iSearch = $('#search');
iNoti = $('#notifi');

iPerfil.on('click',function(){
    $('.ide2').addClass('hide');
    $('.ide1').removeClass('hide');

})
iHome.on('click',function(){
    $('.ide1').addClass('hide');
    $('.ide2').removeClass('hide');

})

iNoti.on('click',function(){
    $('.ide2').addClass('hide');
    $('.ide1').removeClass('hide');

})