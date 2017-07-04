// imports
const file = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const colors = require('colors');
const request = require('request');

/* ----------------- INPUT ----------------- */

// Store input
let input = process.argv;
let fullInput = "";

// takes all arguments after 3rd index & saves them into one string
// used for movie-this spotify-this-song
for (var i = 3; i < input.length; i++)
    if (i > 3 && i < input.length) {
        fullInput = fullInput + "+" + input[i]
    } else {
        fullInput += input[i]
    }

    // object for handleing inputs to dictate which function is called
let argChoice = {
        "my-tweets": function() {
            console.log('tweets!');
            tweetsResponse();
        },
        "spotify-this-song": function() {
            //  if no song is provided - default to "The Sign" by Ace of Base
            if (fullInput === "") {
                fullInput = "the+sign";
                spotifyResponse(fullInput);
                // if user input song
            } else {
                spotifyResponse(fullInput);
            }
        },
        "movie-this": function() {

            if (fullInput === "") {
                fullInput = "mr+nobody";
                getMovie();
            } else {
                getMovie();
                console.log('spotty!');
            }
        },
        "do-what-it-says": function() {}
    } // end argChoice

// chooses function through object literal
argChoice[input[2]]();

// console.log(fullInput); // *test*


/* ----------------- TWITTER ----------------- */

function tweetsResponse() {
    // store keys object
    const twitterKeys = file.twitterKeys;
    const params = { screen_name: 'narins2017' };
    // Twitter keys from export file
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
                console.log("\n===================================================\n".green);

                console.log("#" + i + ". " + tweets[i].text);
                console.log("Date: " + tweets[i].created_at);
            }
        }
    });
}; // end tweetsResponse

/* ----------------- SPOTIFY ----------------- */
function spotifyResponse(fullInput) {
    // spotify key from exported file
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
            // store song object
            var songResponse = data.tracks.items[0];
            console.log("\n===================================================\n".yellow);
            // store artist names
            var artist = songResponse.artists[0].name;
            // store song name
            var songs = songResponse.name;
            // store album song is from
            var album = songResponse.album.name;
            // store preview link of the song from spotify
            var url = songResponse.preview_url;

            console.log("Song Title: ".red + songs + " Artist Name: ".blue + artist + " Album Title: ".magenta + album);
            console.log("Preview Link: ".cyan + url);
            console.log("\n===================================================\n".yellow);

        }
    });
}; // end spotifyResponse

/* ----------------- MOVIE ----------------- */

function getMovie() {
    var queryURL = "http://www.omdbapi.com/?apikey=40e9cece&t=" + fullInput;

    request.get(queryURL, { json: true, body: input }, function(err, res, body) {
        // * Tests *
        // console.log('error:', err); // Print the error if one occurred
        // console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.

        // no error or 404
        if (!err && res.statusCode === 200) {

            console.log("\n=====================\n".yellow);

            // output title
            console.log("Title: ".red + body.Title);
            // output year movie released
            console.log("Year: ".red + body.Year);
            // output imdb rating
            console.log("IMDB Rating: ".red + body.Ratings[0].Value);
            // rotten tomatoes rating
            console.log("IMDB Rating: ".red + body.Ratings[1].Value);
            // country where teh movie was produced
            console.log('Country: '.red + body.Country);
            // language of the movie
            console.log('Languages: '.red + body.Language);
            // plot of the movie 
            console.log('Movie Plot: '.red + body.Plot);
            // actors in the movie
            console.log('Actors:'.red + body.Actors);
        }
    })
} // end getMovie()


/* ----------------- DO WHAT IT SAYS ----------------- */