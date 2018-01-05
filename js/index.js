

$('#boton').on('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
        saveDate(user);
        $('#showPhoto').append("<img src='" + user.photoURL + "' />")
    })

    // .catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    // });
})

// funcion para que se guarde la informacion automaticamente 
function saveDate(user) {
    var usuario = {
        uid: user.uid,
        nombre: user.displayName,
        email: user.email,
        foto: user.photoURL
    }
    firebase.database().ref('object/' + user.uid).set(usuario);
}


//Escribir en la base de datos

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