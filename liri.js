//variables
var dotenv = require("dotenv").config();
var inquirer = require("inquirer");
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)


///comand line prompt
inquirer.prompt([{
        type: "list",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "actionItem"

    }])

    ///calls selected function
    .then(answers => {
        switch (answers.actionItem) {
            case "concert-this":
                bandsInTown();
                break;
            case "spotify-this-song":
                spotifySong();
                break;
            case "movie-this":
                movieTime();
                break;
            case "do-what-it-says":
                readingRandom();
        }
    })
///Bands in Town function
function bandsInTown() {
    inquirer
        .prompt([{
            type: "input",
            name: "band name",
            message: "Which Band"
        }])
        .then(function (artist) {
            var arTist = artist["band name"];
            var artistName = arTist.replace(" ", "%20");
            request("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp", function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    jsonBody = JSON.parse(body)
                    console.log(jsonBody);
                    var venue = jsonBody[0].venue.name;
                    var city = jsonBody[0].venue.city;
                    var date = jsonBody[0].datetime;
                    console.log(venue);
                    console.log(city);
                    console.log(date);
                }
            })
        })
}

///Spotify Function
function spotifySong(randomTrack) {
    if (!randomTrack) {
        inquirer.prompt([{
                type: "input",
                name: "songTitle",
                message: "which song?"
            }])
            .then(answers => {
                console.log(answers.songTitle);
                spotifySearch(answers.songTitle);
            })
    } else {
        spotifySearch(randomTrack)
    }
}

function spotifySearch(trackName) {

    var ace = 0;
    if (!trackName) {
        trackName = "The Sign";
        ace = 1;
    }
    var song = trackName;
    spotify.search({
            type: "track",
            query: song
        },
        function (err, data) {
            if (!err) {
                var trackInfo = data.tracks.items;
                if (ace = 1) {
                    console.log("Artist: ", trackInfo[7].artists[0].name)
                    console.log("Song: ", trackInfo[7].name)
                    console.log("Preview URL: ", trackInfo[7].preview_url)
                    console.log("Album: ", trackInfo[7].album.name)
                } else {
                    for (i = 0; i < 5; i++) {
                        var spotifyResults =
                            "Artist: " + trackInfo[i].artists[0].name + "\n" +
                            "Song: " + trackInfo[i].name + "\n" +
                            "Preview URL: " + trackInfo[i].preview_url + "\n" +
                            "Album: " + trackInfo[i].album.name + "\n"

                        console.log(spotifyResults);
                        console.log(" ");
                    }

                }
            }

        }
    )
}

//Omdb function
function movieTime() {

    inquirer.prompt([{
            type: "input",
            name: "movieTitle",
            message: "which movie?"
        }])
        .then(answers => {
            console.log(answers.movieTitle);

            var movieTitle = answers.movieTitle;
            movieTitle = movieTitle.replace(" ", "+");

            request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    console.log("Title: ", JSON.parse(body).Title);
                    console.log("Year: ", JSON.parse(body).Year);
                    console.log("IMDB rating: ", JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes rating: ", JSON.parse(body).Ratings[1].Value);
                    console.log("Country of origin: ", JSON.parse(body).Country);
                    console.log("Language: ", JSON.parse(body).Language);
                    console.log("Plot: ", JSON.parse(body).Plot);
                    console.log("Actors: ", JSON.parse(body).Actors);
                }
            });
        })

}


///Do what it say functino
function readingRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        var array = data.split(",");
        var trackName = array[1];
        console.log(trackName)
        spotifySong(trackName);
    })
}