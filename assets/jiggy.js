var mUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&" + apiKey
var apiKey = "apikey=b9c0f031"
var title = "";

$.ajax({
    url: "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&" + apiKey,
    method: "GET"
}).then(function (response) {
    console.log(response);
})

