
$(document).ready(function () {
    $('.modal').modal();
    $('select').material_select();

   
    // $('.tap-target').tapTarget('close');
 
    $('.material-icons').click(function(){
        console.log('click');
        $('.tap-target').tapTarget('open');
    })
})