// imports
const file = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const colors = require('colors');
const request = require('request');
const fs = require('fs');
const log = require('log4js');

/* ----------------- INPUT ----------------- */

// Store input
let input = process.argv;
let fullInput = "";

// takes all arguments after 3rd index & saves them into one string
// used for movie-this spotify-this-song
for (let i = 3; i < input.length; i++)
    if (i > 3 && i < input.length) {
        fullInput = fullInput + "+" + input[i]
    } else {
        fullInput += input[i]
    }

    // object for handling inputs to dictate which function is called
let argChoice = {
        "my-tweets": function() {
            tweetsResponse();
        },
        "spotify-this-song": function() {
            //  if no song is provided - default to "The Sign" by Ace of Base
            if (fullInput === "") {
                fullInput = "The Sign Ace";
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
        "do-what-it-says": function() {
            doWhatSays();
        }
    } // end argChoice

// chooses function through object literal
argChoice[input[2]]();

// *test*
// console.log(fullInput); 


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
            for (let i = 0; i < tweets.length; i++) {
                console.log("\n===================================================\n".green);

                console.log("#" + i + ". " + tweets[i].text);
                console.log("Date: " + tweets[i].created_at);

                // Log output to log.txt
                logger.debug("\n===================================================\n".green);
                logger.debug("#" + i + ". " + tweets[i].text);
                logger.debug("Date: " + tweets[i].created_at);

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

            // Log output to log.txt
            logger.debug("\n===================================================\n".yellow);
            logger.debug("Song Title: ".red + songs + " Artist Name: ".blue + artist + " Album Title: ".magenta + album);
            logger.debug("Preview Link: ".cyan + url);
            logger.debug("\n===================================================\n".yellow);


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

            console.log("\n========================================================\n".yellow);

            // output title
            console.log("Title: ".red + body.Title);
            // output year movie released
            console.log("Year: ".red + body.Year);
            // output imdb rating
            console.log("IMDB Rating: ".red + body.Ratings[0].Value);
            // rotten tomatoes rating
            console.log("Rotten Tomatoes Rating: ".red + body.Ratings[1].Value);
            // country where teh movie was produced
            console.log('Country: '.red + body.Country);
            // language of the movie
            console.log('Languages: '.red + body.Language);
            // plot of the movie 
            console.log('Movie Plot: '.red + body.Plot);
            // actors in the movie
            console.log('Actors:'.red + body.Actors);

            // Log output to log.txt
            logger.debug("\n========================================================\n".yellow);
            logger.debug("Title: ".red + body.Title);
            logger.debug("Year: ".red + body.Year);
            logger.debug("IMDB Rating: ".red + body.Ratings[0].Value);
            logger.debug("Rotten Tomatoes Rating: ".red + body.Ratings[1].Value);
            logger.debug('Country: '.red + body.Country);
            logger.debug('Languages: '.red + body.Language);
            logger.debug('Movie Plot: '.red + body.Plot);
            logger.debug('Actors:'.red + body.Actors);
        }
    })
} // end getMovie()


/* ----------------- DO WHAT IT SAYS ----------------- */
function doWhatSays() {
    fs.readFile('./random.txt', 'utf8', (err, data) => {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }
        // test readFile data
        // console.log(`Read File: ${data}`);

        // store into array
        var dataArr = data.split(',');
        // test
        // console.log(`array'd: ${dataArr[1]}`);
        // store 1st argument/item in array for which function is being called
        var funcName = dataArr[0];
        // store 2nd argument/item in array for which song/movie is being searched

        // returns data (bug with logger)
        // argChoice[funcName]();

        //argChoice[do-what-it-says]('some text')
        // Log output to log.txt
        logger.debug(argChoice[funcName]());
    });
} // end doWhatSays

/* ----------------- * BONUS LOG * ----------------- */

const logger = log.getLogger();

log.configure({
    appenders: {
        everything: { type: 'file', filename: 'log.txt' }
    },
    categories: {
        default: { appenders: ['everything'], level: 'debug' }
    }
});