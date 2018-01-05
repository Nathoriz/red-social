
$(document).ready(function () {
    //Nav mobile Materialize
    $(".button-collapse").sideNav();

    //Materialize fecha de nacimiento para formulario
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 90, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
      });
        
      



    //Agregando funcionalidad al boton de facebook 
    $('#botonFacebook').on('click', function () {
        if (!firebase.auth().currentUser) {
            var provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('public_profile');
            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                console.log(user);
                saveDate(user);
                $('#botonFacebook').fadeOut();
                $(".hide").removeClass();

                $('#showPhoto').append("<img src='" + user.photoURL + "' />");
                $('#namePerson').append("<p>" + user.displayName + "</p>");
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
    })




    //Agregando funcionalidad al boton de google 
    $('#botonGoogle').on('click', function () {
        if (!firebase.auth().currentUser) {
            var provider = new firebase.auth.GoogleAuthProvider();
            // provider.addScope('https:www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                // console.log(user);
                // saveDate(user);
                $('#boton').fadeOut();
                $(".hide").removeClass();

                $('#showPhoto').append("<img src='" + user.photoURL + "' />");
                $('#namePerson').append("<p>" + user.displayName + "</p>");
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
    })

    // funcion para que se guarde la informacion automaticamente en firebase sin repetirse
    function saveDate(user) {
        var usuario = {
            uid: user.uid,
            nombre: user.displayName,
            email: user.email,
            foto: user.photoURL
        }
        firebase.database().ref('object/' + user.uid).set(usuario);
    }

    //boton donde se puede escribir en la base de datos y enviarse a firebase
    $('#save').on('click', function () {
        firebase.database().ref('prueba').set({
            edad: 15,
            name: 'y ahora que paso',
            sexo: 'quien sabe'
        })
    })

    // firebase.database().ref('object').on('child_added', function (s) {
    //     var user = s.value;
    //     $('#showPhoto').append("<img src='" + user.foto+ "' />")
    // })





})
