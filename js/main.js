//Elemento del Dom
var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('new-post-message');
var titleInput = document.getElementById('new-post-title');
var signInButtonG = document.getElementById('sign-in-button-google');
var signInButtonF = document.getElementById('sign-in-button-facebook');
var signOutButton = document.getElementById('sign-out-button');
var splashPage = document.getElementById('page-splash');
var addPost = document.getElementById('add-post');
var addButton = document.getElementById('add');
var recentPostsSection = document.getElementById('recent-posts-list');
var userPostsSection = document.getElementById('user-posts-list');
var $topUserPostsSection = $('#top-user-posts-list');
var topUserPostsSection = document.getElementById('top-user-posts-list');
var recentMenuButton = document.getElementById('menu-recent');
var myPostsMenuButton = document.getElementById('menu-my-posts');
var myTopPostsMenuButton = document.getElementById('menu-my-top-posts');
var chatMovil = document.getElementById('chatmovil');
var listeningFirebaseRefs = [];


function writeNewPost(uid, username, picture, body) {

    var postData = {
        author: username,
        uid: uid,
        body: body,
        starCount: 0,
        authorPic: picture
    };


    var newPostKey = firebase.database().ref().child('posts').push().key;


    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}

function toggleStar(postRef, uid) {
    postRef.transaction(function (post) {
        if (post) {
            if (post.stars && post.stars[uid]) {
                post.starCount--;
                post.stars[uid] = null;
            } else {
                post.starCount++;
                if (!post.stars) {
                    post.stars = {};
                }
                post.stars[uid] = true;
            }
        }
        return post;
    });
}

function createPostElement(postId, text, author, authorId, authorPic) {
    var uid = firebase.auth().currentUser.uid;

    var html =
        '<div class="post post-' + postId + ' ed-item s-100 m-60 ' +
        ' mdl-grid--no-spacing">' +
        '<div class=" ">' +

        '<div class="header">' +
        '<div>' +
        '<div class="avatar"></div>' +
        '<div class="username mdl-color-text--black"></div>' +
        '</div>' +
        '</div>' +

        '<div class="text"></div>' +
        '<div class="comments-container"></div>' +
        '<form class="add-comment ed-item l-40" action="#">' +
        '<div class=" ">' +
        '<input class="new-comment" type="text">' +
        '</div>' +
        '</form>' +
        '<span class="star">' +
        '<div class="not-starred material-icons">code</div>' +
        '<div class="starred material-icons">code</div>' +
        '<div class="star-count">0</div>' +
        '</span>' +
        '</div>' +
        '</div>';

    var div = document.createElement('div');
    div.innerHTML = html;
    var postElement = div.firstChild;


    var addCommentForm = postElement.getElementsByClassName('add-comment')[0];
    var commentInput = postElement.getElementsByClassName('new-comment')[0];
    var star = postElement.getElementsByClassName('starred')[0];
    var unStar = postElement.getElementsByClassName('not-starred')[0];


    postElement.getElementsByClassName('text')[0].innerText = text;
    postElement.getElementsByClassName('username')[0].innerText = author || 'Anonymous';
    postElement.getElementsByClassName('avatar')[0].style.backgroundImage = 'url("' +
        (authorPic || 'assets/images/silhouette.jpg') + '")';


    var commentsRef = firebase.database().ref('post-comments/' + postId);
    commentsRef.on('child_added', function (data) {
        addCommentElement(postElement, data.key, data.val().text, data.val().author);
    });

    commentsRef.on('child_changed', function (data) {
        setCommentValues(postElement, data.key, data.val().text, data.val().author);
    });

    commentsRef.on('child_removed', function (data) {
        deleteComment(postElement, data.key);
    });
    var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
    starCountRef.on('value', function (snapshot) {
        updateStarCount(postElement, snapshot.val());
    });

    var starredStatusRef = firebase.database().ref('posts/' + postId + '/stars/' + uid)
    starredStatusRef.on('value', function (snapshot) {
        updateStarredByCurrentUser(postElement, snapshot.val());
    });

    //Referencia a firebase
    listeningFirebaseRefs.push(commentsRef);
    listeningFirebaseRefs.push(starCountRef);
    listeningFirebaseRefs.push(starredStatusRef);

    //crea nuevo comentario
    addCommentForm.onsubmit = function (e) {
        e.preventDefault();
        createNewComment(postId, firebase.auth().currentUser.displayName, uid, commentInput.value);
        commentInput.value = '';

    };


    var onStarClicked = function () {
        var globalPostRef = firebase.database().ref('/posts/' + postId);
        var userPostRef = firebase.database().ref('/user-posts/' + authorId + '/' + postId);
        toggleStar(globalPostRef, uid);
        toggleStar(userPostRef, uid);
    };
    unStar.onclick = onStarClicked;
    star.onclick = onStarClicked;

    return postElement;
}


function createNewComment(postId, username, uid, text) {
    firebase.database().ref('post-comments/' + postId).push({
        text: text,
        author: username,
        uid: uid
    });
}


function updateStarredByCurrentUser(postElement, starred) {
    if (starred) {
        postElement.getElementsByClassName('starred')[0].style.display = 'inline-block';
        postElement.getElementsByClassName('not-starred')[0].style.display = 'none';
    } else {
        postElement.getElementsByClassName('starred')[0].style.display = 'none';
        postElement.getElementsByClassName('not-starred')[0].style.display = 'inline-block';
    }
}


function updateStarCount(postElement, nbStart) {
    postElement.getElementsByClassName('star-count')[0].innerText = nbStart;
}

function addCommentElement(postElement, id, text, author) {
    var comment = document.createElement('div');
    comment.classList.add('comment-' + id);
    comment.innerHTML = '<span class="username"></span><span class="comment"></span>';
    comment.getElementsByClassName('comment')[0].innerText = text;
    comment.getElementsByClassName('username')[0].innerText = author || 'Anonymous';

    var commentsContainer = postElement.getElementsByClassName('comments-container')[0];
    commentsContainer.appendChild(comment);
}


function setCommentValues(postElement, id, text, author) {
    var comment = postElement.getElementsByClassName('comment-' + id)[0];
    comment.getElementsByClassName('comment')[0].innerText = text;
    comment.getElementsByClassName('fp-username')[0].innerText = author;
}

function deleteComment(postElement, id) {
    var comment = postElement.getElementsByClassName('comment-' + id)[0];
    comment.parentElement.removeChild(comment);
}

function startDatabaseQueries() {
    var myUserId = firebase.auth().currentUser.uid;
    var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');
    var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
    var userPostsRef = firebase.database().ref('user-posts/' + myUserId);

    var fetchPosts = function (postsRef, sectionElement) {
        postsRef.on('child_added', function (data) {
            var author = data.val().author || 'Anonymous';
            var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
            containerElement.insertBefore(
                createPostElement(data.key, data.val().body, author, data.val().uid, data.val().authorPic),
                containerElement.firstChild);
        });
        postsRef.on('child_changed', function (data) {
            var containerElement = sectionElement.getElementsByClassName('posts-container')[0];
            var postElement = containerElement.getElementsByClassName('post-' + data.key)[0];
            postElement.getElementsByClassName('username')[0].innerText = data.val().author;
            postElement.getElementsByClassName('text')[0].innerText = data.val().body;
            postElement.getElementsByClassName('star-count')[0].innerText = data.val().starCount;
        });
    };


    fetchPosts(recentPostsRef, recentPostsSection);
    fetchPosts(userPostsRef, userPostsSection);


    listeningFirebaseRefs.push(topUserPostsRef);
    listeningFirebaseRefs.push(recentPostsRef);
    listeningFirebaseRefs.push(userPostsRef);
}

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

function cleanupUi() {
    recentPostsSection.getElementsByClassName('posts-container')[0].innerHTML = '';
    userPostsSection.getElementsByClassName('posts-container')[0].innerHTML = '';


    listeningFirebaseRefs.forEach(function (ref) {
        ref.off();
    });
    listeningFirebaseRefs = [];
}
var currentUID;


function onAuthStateChanged(user) {
    if (user && currentUID === user.uid) {
        return;
    }

    cleanupUi();
    if (user) {
        currentUID = user.uid;
        splashPage.style.display = 'none';
        writeUserData(user.uid, user.displayName, user.email, user.photoURL);
        startDatabaseQueries();
    } else {
        currentUID = null;
        splashPage.style.display = '';
    }
}

//Crea un nuevo post
function newPostForCurrentUser(text) {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        return writeNewPost(firebase.auth().currentUser.uid, username,
            firebase.auth().currentUser.photoURL, text);
    });

}

function showSection(sectionElement, buttonElement) {
    recentPostsSection.style.display = 'none';
    userPostsSection.style.display = 'none';
    topUserPostsSection.style.display = 'none';
    addPost.style.display = 'none';
    recentMenuButton.classList.remove('is-active');
    myPostsMenuButton.classList.remove('is-active');
    myTopPostsMenuButton.classList.remove('is-active');

    if (sectionElement) {
        sectionElement.style.display = 'block';
    }
    if (buttonElement) {
        buttonElement.classList.add('is-active');
    }
}


window.addEventListener('load', function () {


    // var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
    // recentPostsRef.once('child_added', function (data) {

    //   var author = data.val().author || 'Anonymous';
    //   console.log(data.key);
    //   console.log(data.val().body);
    //   console.log(data.val().authorPic);
    //   $('#postsDesk').append("<div class='postsDesktop'>" + "<img src='" + data.val().authorPic + 
    //   "' class='circle ed-item l-20' />" + "<h4>" + author + "</h4>" + "<p>" + data.val().body + "</p>" + "</div>");
    //   //   createPostElement(data.key, data.val().body, author, data.val().uid, data.val().authorPic),
    //   //   containerElement.firstChild);
    // });



    firebase.database().ref('/users/').once('value').then(function (snapshot) {
        var user = firebase.auth().currentUser;
        // console.log(user);
        $('#desktop-perfil').html("<img class='activator' src='" + user.photoURL + "'>");
        $('.card-content').html('<span class="card-title activator grey-text text-darken-4"> ' + user.displayName + ' <i class="material-icons right">more_vert</i></span>' + "<p><a href='#'>Agregar informarción +</a></p>");
        // "<div class='ed-item s-90 m-40 s-offset-5'>  <p> Nombre: " + user.displayName + "</p> <a href=''>Agrega Descripción +</a> </div>"  );


    });

    signInButtonG.addEventListener('click', function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    });

    signInButtonF.addEventListener('click', function () {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider);
    });




    signOutButton.addEventListener('click', function () {
        firebase.auth().signOut();
    });


    firebase.auth().onAuthStateChanged(onAuthStateChanged);


    messageForm.onsubmit = function (e) {
        e.preventDefault();
        var text = messageInput.value;
        if (text) {
            newPostForCurrentUser(text).then(function () {
                myPostsMenuButton.click();
            });
            messageInput.value = '';
        }
    };


    recentMenuButton.onclick = function () {
        showSection(recentPostsSection, recentMenuButton);
    };
    myPostsMenuButton.onclick = function () {
        showSection(userPostsSection, myPostsMenuButton);
    };
    myTopPostsMenuButton.onclick = function () {
        showSection(topUserPostsSection, myTopPostsMenuButton);

        var user = firebase.auth().currentUser;
        console.log(user.photoURL.photoURL);
        $topUserPostsSection.html("<img class='ed-item s-90 m-30 s-offset-5' src='" + user.photoURL + "' />" +
            "<div class='ed-item s-90 m-40 s-offset-5'>  <p> Nombre: " + user.displayName + "</p> <a href=''>Agrega Descripción +</a> </div>");

    };
    addButton.onclick = function () {
        showSection(addPost);
        messageInput.value = '';
    };
    chatMovil.onclick = function () {
        console('click en chat');

    };

    recentMenuButton.onclick();
}, false);