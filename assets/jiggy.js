var q = "";
var mUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&type=movie&" + apiKey;
var apiKey = "apikey=b9c0f031"
var title = "Footloose";

// $("#movie-search").on("click", function () {
//     search();
// });

// $("#tv-search").on("click", function () {
//     search();
// });

// $("#type-search").on("click", function () {
//     search();
// })

// function search() {

// var title = $("#input").val().trim();
// var q = $("#input-2").val().trim();


$.ajax({
    url: "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&type=movie&" + apiKey,
    method: "GET"
}).then(function (response) {
    console.log(response);
});

var ytube = "AIzaSyAgdHAGfQ-cKmJhT-WqMdG8gv3MKVXRNP0";
$.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&pageToken=CAoQAA&q=${q}&type=video&key=${ytube}`,
    method: "GET",

    error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }

}).then(function (response) {
    console.log(response);
});

$("#search-appears-here").append()

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
//Replace the 'ytplayer' element with an < iframe > and
//YouTube player after the API code downloads.










