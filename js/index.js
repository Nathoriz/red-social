
$(document).ready(function () {

    // AQUI HACEMOS LA VALIDACION DE NUESTRO BOTON INDEPENDIENTE REGISTRO 
    // Llamando elementos del html 
    $name = $('#first_name');
    $last = $('#last_name');
    $email = $('#emailSignUp');
    $password = $('#passwordSignUp');
    $passConf = $('#passConfir');
    $butonSign = $('#btn-registrar');
    $logOut = $('#btn-logout');
    $btnAauth = $('#btn-firebaseAuth');


    $emailLogin = $('#email');
    $passLogin = $('#pass');
    $btnLogin = $('#btn-login');

    //Variables verificadoras booleanas
    var verifyName = false;
    var verifyLastName = false;
    var verifyEmail = false;
    var verifycheck = false;
    var verifyPassword = false;

    //Agregando funcionalidad al boton de facebook 
    $('#btn-facebook').on('click', loginFacebook);
    function loginFacebook() {
        if (!firebase.auth().currentUser) {
            var provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('user_friends');
            firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                alert(user);
                console.log('autenticado usuario ', user);
                saveDate(user);
                showImage(user);
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                if (error.code === 'auth/account-exists-with-different-credential') {
                    alert(error);
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

    $btnLogin.on('click', function () {
        const email = $emailLogin.val();
        const password = $passLogin.val();
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(function (error) {

            alert(error);
        });

    })

    $btnAauth.on('click', function (e) {
        var emailA = $email.val();
        var pass = $password.val();
        var auth = firebase.auth();
        var promise = auth.createUserWithEmailAndPassword(emailA, pass);
        promise.catch(function (error) {
            alert(error);
        });
    })


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
            console.log('logeado');
        } else {
            console.log('no logeado');
            $logOut.addClass('hide');
            // User is signed out.
            // ...
        }
    });

    $logOut.on('click', function (e) {
        firebase.auth().signOut();
    })

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


    //Agregamos eventos a nuestros input
    // $password.on('keyup', function () {
    //     var input = $password.val();
    //     // var regex = /^[a-zA-Z]*$/;
    //     if (input.length > 3) {
    //         verifyPassword = true;
    //         activeBoton();
    //     } else {
    //         desactiveBoton();
    //     }
    // });

    // $name.on('keyup', function (e) {
    //     console.log(e);
    //     var input = $name.val();
    //     var regex = /^[a-zA-Z]*$/;
    //     if (regex.test(input) && input.length > 3) {
    //         verifyName = true;
    //         activeBoton();
    //         $buton.removeClass('disabled');
    //     } else {
    //         desactiveBoton();
    //     }
    // });

    // $last.on('keyup focus', function () {
    //     var input = $last.val();
    //     var regex = /^[a-zA-Z]*$/;
    //     if (regex.test(input) && input.length > 3) {
    //         verifyLastName = true;
    //         activeBoton();
    //     } else {
    //         desactiveBoton();
    //     }
    // });

    // $email.on('keyup focus', function () {
    //     var input = $email.val();
    //     var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     if (regex.test(input)) {
    //         verifyEmail = true;
    //         activeBoton();
    //     } else {
    //         desactiveBoton();
    //     }

    // });

    function activeBoton() {
        //verifyName && verifyLastName && verifycheck
        if (verifyName && verifyLastName && verifyEmail) {
            $butonSign.removeClass('disabled');
        }
    }

    function desactiveBoton() {
        $butonSign.addClass('disabled');
    }




})
