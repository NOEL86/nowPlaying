
$("#movie-search").on("click", function () {
    search();
});

$("#tv-search").on("click", function () {
    search();
});

$("#type-search").on("click", function () {
    search();
})

function search() {

    var title = $("#input").val().trim();
    var mUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&" + apiKey
    var apiKey = "apikey=b9c0f031"
    var title = "";

    $.ajax({
        url: "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&" + apiKey,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })

    var DRIVE_UPLOAD_URL = 'https://www.youtube.com/embed?listType=search&list=Batman';
    var q = "";

    $.ajax({
        url: "https://www.youtube.com/embed?listType=search&list=QUERY",
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })

    function init() {
        gapi.client.setApiKey('AIzaSyAgdHAGfQ-cKmJhT-WqMdG8gv3MKVXRNP0');
        gapi.client.load("youtube", "v3", function () {
        });

    }

    console.log(response);

};



// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '360',
        width: '640',
        videoId: 'M7lc1UVf-VE'
    });
}



