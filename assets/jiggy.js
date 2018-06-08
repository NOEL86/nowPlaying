var q = "footloose";
var mUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&type=movie&" + apiKey;
var apiKey = "apikey=b9c0f031"
var title = "footloose";

// $("#movie-search").on("click", function () {
//     search();
// });

// $("#tv-search").on("click", function () {
//     search();
// });

// $("#typeSearchButton").on("click", function () {

//     search();
// })

function search() {
    // q = $("#typeSearch").val().trim();
    // title = $("#typeSearch").val().trim();

    // var title = $("#input").val().trim();
    // var q = $("#input-2").val().trim();

    // var DRIVE_UPLOAD_URL = 'https://www.youtube.com/embed?listType=search&list=Batman';
    // var q = "";

    $.ajax({
        url: "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&type=movie&rating=&" + apiKey,
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

function getTrailer() {
    var ytube = "AIzaSyAgdHAGfQ-cKmJhT-WqMdG8gv3MKVXRNP0";

    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&pageToken=CAoQAA&q=${q}&trailer&type=video&key=${ytube}`,
        method: "GET",

        error: function (jqXHR, appendStatus, errorThrown) {
            console.log(errorThrown);
        }





    });

};

search();
getTrailer();


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
}











