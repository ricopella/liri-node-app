// import keys.js file
const file = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const colors = require('colors');
// const $ = require('jquery');
const request = require('request');

/* ----------------- INPUT ----------------- */

// Store input
var input = process.argv;
var fullInput = "";

// takes all arguments after 3rd index & saves them into one string
// used for movie-this spotify-this-song
for (var i = 3; i < input.length; i++)
    if (i > 3 && i < input.length) {
        fullInput = fullInput + "+" + input[i]
    } else {
        fullInput += input[i]
    }

switch (input[2]) {
    case "my-tweets":
        console.log('tweets!');
        tweetsResponse();
        break;

    case "spotify-this-song":
        console.log('spotty!');
        //  if no song is provided - default to "The Sign" by Ace of Base
        if (fullInput === "") {
            spotifyNotSpecified();
            // if user input song
        } else {
            spotifyResponse(fullInput);
        }
        break;

    case "movie-this":
        getMovie();
        break;

    case "do-what-it-says":
        break;

    default:
        break;
}

// console.log(fullInput); // *test*


/* ----------------- TWITTER ----------------- */



function tweetsResponse() {

    // store keys object
    const twitterKeys = file.twitterKeys;
    const params = { screen_name: 'narins2017' };

    var client = new Twitter({
        consumer_key: twitterKeys.consumer_key,
        consumer_secret: twitterKeys.consumer_secret,
        access_token_key: twitterKeys.access_token_key,
        access_token_secret: twitterKeys.access_token_secret
    });

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // logs all tweets object
            // console.log(tweets[0].text);
            for (var i = 0; i < tweets.length; i++) {
                console.log("\n=====================\n".green);

                console.log("\n" + "#" + i + ". " + tweets[i].text);
                console.log("Date: " + tweets[i].created_at);
            }
        }
    });
};

/* ----------------- SPOTIFY ----------------- */



function spotifyResponse(fullInput) {

    const spotifyKeys = file.spotifyKeys;

    var spotify = new Spotify({
        id: spotifyKeys.id,
        secret: spotifyKeys.secret
    });

    // change to fullInput
    spotify.search({ type: 'track', query: fullInput }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else if (!err) {

            console.log("\n=====================\n".yellow);

            // store artist names
            var artist = data.tracks.items[0].artists[0].name;
            // store song name
            var songs = data.tracks.items[0].name;
            // store album song is from
            var album = data.tracks.items[0].album.name;
            // store preview link of the song from spotify
            var url = data.tracks.items[0].preview_url;
            console.log(songs);
            console.log(artist);
            console.log(album);
            console.log(url);


        }
    });

}

function spotifyNotSpecified() {

    const spotifyKeys = file.spotifyKeys;

    var spotify = new Spotify({
        id: spotifyKeys.id,
        secret: spotifyKeys.secret
    });

    //  if no song is provided - default to "The Sign" by Ace of Base
    console.log('testing123333');

    spotify.search({ type: 'track', query: "The+Sign" }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else if (!err) {

            console.log("\n=====================\n");

            // store artist names
            var artist = data.tracks.items[0].artists[0].name;
            // store song name
            var songs = data.tracks.items[0].name;
            // store album song is from
            var album = data.tracks.items[0].album.name;
            // store preview link of the song from spotify
            var url = data.tracks.items[0].preview_url;
            console.log(songs);
            console.log(artist);
            console.log(album);
            console.log(url);
        }
    });
};

/* ----------------- MOVIE ----------------- */

function getMovie() {
    var queryURL = "http://www.omdbapi.com/?apikey=40e9cece&t=rush+hour"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
    });
}
/* ----------------- DO WHAT IT SAYS ----------------- */