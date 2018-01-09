
$(document).ready(function () {

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
    // AQUI HACEMOS LA VALIDACION DE NUESTRO BOTON INDEPENDIENTE REGISTRO 
    // Llamando elementos del html 
    $name = $('#first_name');
    $last = $('#last_name');
    $email = $('#email');
    $password = $('#password');
    $checkbox = $("#test5");
    $butonSign = $('#btn-registrar');  
    $logOut = $('#btn-logout');
    $btnAauth = $('#btn-firebaseAuth');


    $emailModal = $('#emailModal');
    $passwordModal = $('#passwordModal');
    $btnLogin = $('#btn-login');

    //Variables verificadoras booleanas
    var verifyName = false;
    var verifyLastName = false;
    var verifyEmail = false;
    var verifycheck = false;
    var verifyPassword = false;

    //Agregamos eventos a nuestros input
    $password.on('keyup', function () {       
        var input = $password.val();
        // var regex = /^[a-zA-Z]*$/;
        if (input.length > 3) {
            verifyPassword = true;
            activeBoton();
        } else {
            desactiveBoton();
        }
    });

    $name.on('keyup', function (e) {
        console.log(e);
        var input = $name.val();
        var regex = /^[a-zA-Z]*$/;
        if (regex.test(input) && input.length > 3) {
            verifyName = true;
            activeBoton();            
            $buton.removeClass('disabled');
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

    function activeBoton() {
        //verifyName && verifyLastName && verifycheck
        if (verifyName && verifyLastName && verifycheck && verifyEmail) {            
            $butonSign.removeClass('disabled');
        }
    }

    function desactiveBoton() {
        $butonSign.addClass('disabled');
    }

    $btnLogin.on('click', function () {
        var $email = $emailModal.val();
        var $password = $passwordModal.val();
        var auth = firebase.auth();
        var promise = auth.signInWithEmailAndPassword($email, $password);
        promise.catch(e => console.log("hola"));

    })

    $btnAauth.on('click', function () {
        var email = $email.val();
        var password = $password.val();
        var auth = firebase.auth();
        var promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
        $('.order-1').addClass('hide');
        $('.order-2').removeClass('hide');
    })

    $butonSign.on('click', function () {
        firebase.database().ref('registro').push({
            nombre: $name.val(),
            apellido: $last.val(),
            email: $email.val(),
            acepta: $checkbox.val()
        })
    })

    $logOut.on('click', function (e) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user);
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                $logOut.removeClass('hide');
            } else {
                console.log('no logeado');
                $logOut.addClass('hide');
                // User is signed out.
                // ...
            }
        });

    })
})