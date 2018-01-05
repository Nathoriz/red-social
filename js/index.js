

// var ref = config.databaseURL;
// console.log(ref);
// ref.child('webName').on('value',function(snapshot){
//    console.log(snapshot.val());

// });



$('#boton').on('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // saveDate(user);
        console.log(user);
        $('#showPhoto').append("<img src='"+user.photoURL+"' />")
        // ... 
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });


})





//funcion para que se guarde la informacion automaticamente 
// function saveDate(user) {
//     var usuario = {
//         nombre:user.displyaName,
//         email:user.email,
//         foto:user.photoURL
//     }
//     firebase.database().ref('red-social1').push(usuario);
// }

// $('#save').on('click',function(){
//     firebase.database().ref('bolsa').set({
//         nombre:'blis',
//         edad:15,
//         sexo:femenino
//     })
// })