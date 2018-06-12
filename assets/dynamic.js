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
var apiKey = "apikey=b9c0f031"
var title = "";
var id = 0;

$(window).on('load', function () {

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
            getTrailer();
            similarMovies();
        });

    };



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
        id = snapshot.val().id;

        $("#title").append(title);
        $("#rating").append(rating);
        $("#reviewScore").append(rottenTomatoesScore);
        $("#cast").append(cast);
        $("#synopsis").append(synopsis);
        $("#poster").attr("src", poster);


        function getTrailer() {
            var ytube = "AIzaSyAgdHAGfQ-cKmJhT-WqMdG8gv3MKVXRNP0";
            var title = snapshot.val().title;


            $.ajax({
                url: `https://www.googleapis.com/youtube/v3/search?i18nLanguages&part=snippet&hl=en_US&maxResults=5&order=viewCount&q=${title}officialtrailer&type=video&key=${ytube}`,
                method: "GET",

            }).then(function (response) {
                console.log(response);

                var itemNumber = 0;

                $("#ytPlayer").append("<iframe id=\"player\" type\"text/html\" width=\"100%\" height=\"350px\" src=\"\" frameborder=\"0\"></iframe>");
                //button for next possibly
                $("#player").attr('src', "https://www.youtube.com/embed/" + response.items[1].id.videoId + "?autoplay=1");

            });

        };

        getTrailer();
        similarMovies();

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });



    // Search Button Function
    $("#dynamicSearchButton").on("click", function (event) {
        event.preventDefault();
        title = $("#dynamicSearch").val().trim();
        console.log(title);
        search();
        $("#dynamicSearch").val("");

    });

    function similarMovies() {
        var queryURL = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${title}&page=1&include_adult=false&api_key=6364491e63695bac0f912490a6a5a3d8`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var id = response.results[0].id;

            var queryURL2 = `https://api.themoviedb.org/3/movie/language=en-US&{movie_${id}}/similar?page=1&include_adult=false&api_key=6364491e63695bac0f912490a6a5a3d8`;
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (results) {


                console.log(results);

                // for (i = 0; i < 3; i++) {
                //     var responseTitle = response.results[i].original_title;
                //     var id = "movie" + i;
                //     var similarID = '<li id="' + id + '" class="listID" data-name="' + responseTitle + '">' + responseTitle + '</li>';
                //     console.log(listID);

                //     if (response.results[i].original_language == "en") {
                //         $(".Similar").append(similarID);
                //     };

                // };

            });

        });
    };

});





