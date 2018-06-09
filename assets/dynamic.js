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

var q = "";
var apiKey = "apikey=b9c0f031"
var title = "";

function search() {

    $.ajax({
        url: "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&type=movie&rating=&" + apiKey,
        method: "GET"
    }).then(function (response) {

        var title = response.Title;
        var rating = response.Rated;
        var imdbScore = response.Ratings[0].Source + ": " + response.Ratings[0].Value;
        var rottenTomatoesScore = response.Ratings[1].Source + ": " + response.Ratings[1].Value;
        var metaCrticScore = response.Ratings[2].Source + ": " + response.Ratings[2].Value;
        var cast = response.Actors;
        var synopsis = response.Plot;
        var poster = response.Poster;

        newMovie = {
            title: title,
            rating: rating,
            imdbScore: imdbScore,
            rottenTomatoesScore: rottenTomatoesScore,
            metaCrticScore: metaCrticScore,
            cast: cast,
            synopsis: synopsis,
            poster: poster,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

        console.log(newMovie);

        database.ref().push(newMovie);

    });

};

$(window).on('load', function () {

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

        $("#title").empty();
        $("#rating").empty();
        $("#reviewScore").empty();
        $("#cast").empty();
        $("#synopsis").empty();
        $("#poster").empty();

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

// Search Button Function
$("#dynamicSearchButton").on("click", function (event) {
    event.preventDefault();

    q = $("#dynamicSearch").val().trim();
    title = $("#dynamicSearch").val().trim();

    search();
    getTrailer();

    $("#dynamicSearch").val("");

});

function getTrailer(q) {
    var ytube = "AIzaSyAgdHAGfQ-cKmJhT-WqMdG8gv3MKVXRNP0";

    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&pageToken=CAoQAA&q=${q}&trailer&type=video&key=${ytube}`,
        method: "GET",

        error: function (jqXHR, appendStatus, errorThrown) {
            console.log(errorThrown);
        }


    });

};

//Load the IFrame Player API code asynchronously.
// var tag = document.createElement('script');
// tag.src = "https://www.youtube.com/player_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// var player;
// function onYouTubePlayerAPIReady() {
//     player = new YT.Player('ytplayer', {
//         height: '360',
//         width: '640',
//         videoId: 'M7lc1UVf-VE'
//     });


// };










