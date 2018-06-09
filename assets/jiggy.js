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
// var tv = "";
// var movies = "";

function dynamic() {
    window.open('dynamic.html', '_target'); //self to target
};

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
        dynamic();

    });

};

function movieList() {

    var queryURL = "https://api.themoviedb.org/3/movie/popular?api_key=6364491e63695bac0f912490a6a5a3d8&language=en-US&page=1&append_to_response=now_playing";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(queryURL);
        console.log(response);

        for (i = 0; i < 15; i++) {
            var responseTitle = response.results[i].original_title;
            var id = "movie" + i;
            var listID = '<a href="dynamic.html"><li id="' + id + '" class="listLink" data-name="' + responseTitle + '">' + responseTitle + '</li></a>';

            console.log(listID);

            if (response.results[i].original_language == "en") {
                $(".movieList").append(listID);
            };

        };

    });
};


function tvList() {
    var APIKeyMovie = "6364491e63695bac0f912490a6a5a3d8";
    var queryURL = "https://api.themoviedb.org/3/tv/on_the_air?api_key=6364491e63695bac0f912490a6a5a3d8&language=en-US&page=1&append_to_response=popular";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(queryURL);
        console.log(response);


        for (i = 0; i < 15; i++) {
            response.results[i].original_name;
            var id = "tv" + i;
            var listID = '<li id="' + id + '" class="listLink">' + response.results[i].original_name + '</li></a>';

            if (response.results[i].origin_country == "US") {
                $(".tvList").append(listID);
            };
        };

    });
};

$(".linkLink").on("click", function (event) {
    event.preventDefault();
    title = $(this).attr("data-name");
    q = $(this).attr("data-name");

    search();
    // getTrailer();

});

$(window).on('load', function () {
    tvList();
    movieList();
});

// Search Button Function
$("#typeSearchButton").on("click", function (event) {
    event.preventDefault();

    title = $("#typeSearch").val().trim();
    q = $("#typeSearch").val().trim();

    search();
    getTrailer();

});

// Poster Function
$(".devPicks").on("click", function (event) {
    event.preventDefault();

    title = $(this).attr("data-name");
    q = $(this).attr("data-name")

    search();
    getTrailer();

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
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '360',
        width: '640',
        videoId: 'M7lc1UVf-VE'
    });

};


 // function movieWithMultipleWords(movie) {
    //     var movieName = "";
    //     var movieArray = movie.split(" ");

    //     for (var i = 0; i < movieArray.length; i++) {

    //         if (i > 0 && i < movieArray.length) {

    //             movieName = movieName + "+" + movieArray[i];

    //         }

    //         else {

    //             movieName += movieArray[i];

    //         }
    //     }
    //     return movieName

    // }





