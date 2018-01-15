//Variable con acceso a datos 
var TablaDeBaseDatos = firebase.database().ref('chat');
TablaDeBaseDatos.limitToLast(20).on('value', function (snapshot) {
    $(".chat").html(""); // Limpiamos todo el contenido del chat

    // Leer todos los mensajes en firebase
    snapshot.forEach(function (e) {
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


firebase.database().ref('/users/').once('value').then(function (snapshot) {
    var user = firebase.auth().currentUser;
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    var Nombre = user.displayName;
    // $('.chat-img').append("<img src='" + user.photoURL + "' class='circle ed-item s-20' />");
    // $('.chat-img').append("<img src='data:image/jpeg;base64,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' class='circle ed-item s-20' />");

    $('#btnEnviar').click(function () {

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