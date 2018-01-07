
$(document).ready(function () {
    //Nav mobile Materialize
    // $(".button-collapse").sideNav();

    //Materialize fecha de nacimiento para formulario
    // $('.datepicker').pickadate({
    //     selectMonths: true, // Creates a dropdown to control month
    //     selectYears: 90, // Creates a dropdown of 15 years to control year,
    //     today: 'Today',
    //     clear: 'Clear',
    //     close: 'Ok',
    //     closeOnSelect: false // Close upon selecting a date,
    //   });





    //Agregando funcionalidad al boton de facebook 

    $('#btn-facebook').on('click', loginFacebook);
    function loginFacebook() {
        if (!firebase.auth().currentUser) {
            var provider = new firebase.auth.FacebookAuthProvider();
            // provider.addScope('https:www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                saveDate(user);
                showImage(user)
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                if (error.code === 'auth/account-exists-with-different-credential') {
                    alert('Es el mismo usuario');
                }
            });
        }
        else {
            firebase.auth().signOut();
        }
    }

    $('#btn-google').on('click', loginGoogle);
    function loginGoogle() {
        if (!firebase.auth().currentUser) {
            var provider = new firebase.auth.GoogleAuthProvider();
            // provider.addScope('https:www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                saveDate(user);
                showImage(user)
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                if (error.code === 'auth/account-exists-with-different-credential') {
                    alert('Es el mismo usuario');
                }
            });
        }
        else {
            firebase.auth().signOut();
        }
    }

    //Funcion para mostrar imagen
    function showImage(user) {
        $('#showPhoto').append("<img src='" + user.photoURL + "' />");
        $('#namePerson').append("<p>" + user.displayName + "</p>");
    }
    // funcion para que se guarde la informacion automaticamente en firebase sin repetirse
    function saveDate(user) {
        var usuario = {
            uid: user.uid,
            nombre: user.displayName,
            email: user.email,
            foto: user.photoURL
        }
        firebase.database().ref('redes/' + user.uid).set(usuario);
    }



    //boton donde se puede escribir en la base de datos y enviarse a firebase
    $('#btn-registrar').on('click', function () {
        firebase.database().ref('registro').set({
            nombre: $name.val(),
            apellido: $last.val(),
            email: $email.val(),
            clave: $password.val(),
            acepta: $checkbox.val()
        })
    })


// AQUI HACEMOS LA VALIDACION DE NUESTRO BOTON INDEPENDIENTE REGISTRO 
    // Llamando elementos del html 
    $name = $('#first_name');
    $last = $('#last_name');
    $email = $('#email');
    $checkbox = $("#test5");
    $buton = $('#btn-registrar');
    $password = $('#password');


    //Variables verificadoras booleanas
    var verifyName = false;
    var verifyLastName = false;
    var verifyEmail = false;
    var verifycheck = false;
    var verifyPassword = false;

    //Agregamos eventos a nuestros input

    $password.on('keyup focus', function () {
        var input = $password.val();
        // var regex = /^[a-zA-Z]*$/;
        if (input.length > 3) {
            verifyPassword = true;
            activeBoton()
        } else {
            desactiveBoton();
        }


    });


    $name.on('keyup focus', function () {
        var input = $name.val();
        var regex = /^[a-zA-Z]*$/;
        if (regex.test(input) && input.length > 3) {
            verifyName = true;
            activeBoton()
        } else {
            desactiveBoton();
        }


    });

    $last.on('keyup focus', function () {
        var input = $last.val();
        var regex = /^[a-zA-Z]*$/;
        if (regex.test(input) && input.length > 3) {
            verifyLastName = true;
            activeBoton();
        } else {
            desactiveBoton();
        }


    });

    $email.on('keyup focus', function () {
        var input = $email.val();
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(input)) {
            verifyEmail = true;
            activeBoton();
        } else {
            desactiveBoton();
        }

    });
    $checkbox.on('click', function () {
        if ($checkbox.prop("checked")) {
            verifycheck = true;
            activeBoton();
        } else {
            desactiveBoton();
        }

    });
    $buton.on('click', function () {
        $name.val("")
        $last.val("");
        $email.val("")
        $checkbox.val("");
        $buton.val("");
        // window.location.href = "final.html";
        alert('datos enviados')
    });

    function activeBoton() {
        if (verifyName && verifyLastName && verifyEmail && verifycheck && verifyPassword) {
            $buton.removeClass('disabled');
        }
    }

    function desactiveBoton() {
        $buton.addClass('disabled');
    }



})