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

        console.log(title);

        $("#title").append(database.title);
        $("#rating").append(rating);
        $("#reviewScore").append(reviewSource);
        $("#reviewScore").append(reviewScore);
        $("#cast").append(cast);
        $("#synopsis").append(synopsis);
        $("#poster").attr("src", poster);

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

});









