$(document).ready(function() {

  // AQUI HACEMOS LA VALIDACION DE NUESTRO BOTON INDEPENDIENTE REGISTRO 
  // Llamando elementos del html 

  $signButon = $('#sign-in-button-sign');
  $loginButon = $('#log-in-button');
  $email = $('#email');
  $pass = $('#password');

  $loginButon.on('click', function() {
      var email = $email.val();
      var password = $pass.val();
      var auth = firebase.auth();
      var promise = auth.signInWithEmailAndPassword(email, password);
      promise.catch(function(error) {
          alert(error);
      });

  })

  $signButon.on('click', function(e) {
      var email = $email.val();
      var password = $pass.val();
      var auth = firebase.auth();
      var promise = auth.createUserWithEmailAndPassword(email, password);
      promise.catch(function(error) {
          alert(error);
      });
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




})