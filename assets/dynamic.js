var config = {
    apiKey: "AIzaSyB_p0WIpiO2nbmIL2MWja2NLh9oiBaJ5d4",
    authDomain: "now-playing-test.firebaseapp.com",
    databaseURL: "https://now-playing-test.firebaseio.com",
    projectId: "now-playing-test",
    storageBucket: "now-playing-test.appspot.com",
    messagingSenderId: "22833908007"
};

firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

        title = snapshot.val().title;
        rating = snapshot.val().rating;
        imdbScore = snapshot.val().imdbScore;
        rottenTomatoesScore = snapshot.val().rottenTomatoesScore;
        metaCrticScore = snapshot.val().metaCrticScore;
        cast = snapshot.val().cast;
        synopsis = snapshot.val().synopsis;
        poster = snapshot.val().poster;

        $("#title").append(title);
        $("#rating").append(rating);
        $("#reviewScore").append(rottenTomatoesScore);
        $("#cast").append(cast);
        $("#synopsis").append(synopsis);
        $("#poster").attr("src", poster);

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

});









