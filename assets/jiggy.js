var q = "";
var apiKey = "apikey=b9c0f031"
var title = "";


$("#devPicks").on("click", function () {
    title = $(this).attr("data-name")
    q = $(this).attr("data-name")
    console.log(title);
    search(title);
    getTrailer(q);
});

$("#devPicks1").on("click", function () {
    title = $(this).attr("data-name")
    q = $(this).attr("data-name")
    console.log(title);
    search(title);
    getTrailer(q);
});

$("#devPicks2").on("click", function () {
    title = $(this).attr("data-name")
    q = $(this).attr("data-name")
    console.log(title);
    search(title);
    getTrailer(q);
});

$("#devPicks3").on("click", function () {
    title = $(this).attr("data-name")
    q = $(this).attr("data-name")
    console.log(title);
    search(title);
    getTrailer(q);
});

$("#devPicks4").on("click", function () {
    title = $(this).attr("data-name")
    q = $(this).attr("data-name")
    console.log(title);
    search(title);
    getTrailer(q);
});

$("#devPicks5").on("click", function () {
    title = $(this).attr("data-name")
    q = $(this).attr("data-name")
    console.log(title);
    search(title);
    getTrailer(q);
});

$("#typeSearchButton").on("click", function (event) {
    event.preventDefault();
    q = $("#typeSearch").val().trim();
    title = $("#typeSearch").val().trim();
    search(title);
    getTrailer(q);
    $("#typeSearch").val("");
});

function search(title) {

    $.ajax({
        url: `http://www.omdbapi.com/?t=${title}&y=&plot=short&type=movie&rating=&${apiKey}`,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $("#rating").append(response.Rated);
        console.log(response.Rated);

        $("#reviewScore").append(response.Ratings[1].Source);
        $("#reviewScore").append(response.Ratings[1].Value);

        console.log(response.Ratings);

        $("#cast").append(response.Actors);
        console.log(response.Actors);

        $("#synopsis").append(response.Plot);
        console.log(response.Plot)

        $("#poster").attr("src", response.Poster);
        console.log(response.Poster);

        $("#synopsis2").append(response.Plot);


    });

};

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





