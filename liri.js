// import keys.js file
const file = require('./keys.js');
const Twitter = require('twitter');

/* ----------------- INPUT ----------------- */

// Store input
var input = process.argv;
var fullInput = "";

// takes all arguments & saves them into one string
for (var i = 2; i < input.length; i++)
    if (i > 2 && i < input.length) {
        fullInput = fullInput + "+" + input[i]
    } else {
        fullInput += input[i]
    }

switch (fullInput) {
    case "my-tweets":
        tweetsResponse();
        break;

    default:
        break;
}

// console.log(fullInput); // *test*


/* ----------------- TWITTER ----------------- */

// store keys object
const keys = file.twitterKeys;
const params = { screen_name: 'narins2017' };

var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
});



function tweetsResponse() {

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