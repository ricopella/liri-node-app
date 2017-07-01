// import keys.js file
const file = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

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
        console.log('spotty');
        spotifyResponse();
        break;

    case "movie-this":
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
                console.log("\n" + "#" + i + ". " + tweets[i].text);
                console.log("Date: " + tweets[i].created_at);
            }
        }
    });
};

/* ----------------- SPOTIFY ----------------- */



function spotifyResponse() {

    const spotifyKeys = file.spotifyKeys;

    var spotify = new Spotify({
        id: spotifyKeys.id,
        secret: spotifyKeys.secret
    });

    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data);
    });
};

/* ----------------- MOVIE ----------------- */

/* ----------------- DO WHAT IT SAYS ----------------- */