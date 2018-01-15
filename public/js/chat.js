//Variable con acceso a datos 
var TablaDeBaseDatos = firebase.database().ref('chat');
TablaDeBaseDatos.limitToLast(20).on('value', function(snapshot) {
    $(".chat").html(""); // Limpiamos todo el contenido del chat

    // Leer todos los mensajes en firebase
    snapshot.forEach(function(e) {
        var objeto = e.val(); // Asignar todos los valores a un objeto

        // Validar datos nulos y agregar contenido en forma de lista etiqueta <li>
        if ((objeto.Mensaje != null) && (objeto.Nombre != null)) {
            // Copia el contenido al template y luego lo inserta en el chat
            $("#plantilla").clone().prependTo(".chat");
            $('.chat #plantilla').show(10);
            $('.chat #plantilla .Nombre').html(objeto.Nombre);
            $('.chat #plantilla .Mensaje').html(objeto.Mensaje);
            $('.chat #plantilla .Tiempo').html(objeto.Fecha);
            $('.chat #plantilla').attr("id", "");
        }

    });
});


firebase.database().ref('/users/').once('value').then(function(snapshot) {
    var user = firebase.auth().currentUser;
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    var Nombre = user.displayName;
    $('.chat-img').append("<img src='" + user.photoURL + "' class='circle ed-item s-20' />");

    $('#btnEnviar').click(function() {

        var formatofecha = new Date();
        var d = formatofecha.getUTCDate();
        var m = formatofecha.getMonth() + 1;
        var y = formatofecha.getFullYear();
        var h = formatofecha.getHours();
        var min = formatofecha.getMinutes();

        Fecha = d + "/" + m + "/" + y + " " + h + ":" + min;

        TablaDeBaseDatos.push({
            Nombre: Nombre,
            Mensaje: $("#Mensaje").val(),
            Fecha: Fecha
        });
        $("#Mensaje").val('');
    });


});