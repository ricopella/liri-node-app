// import keys.js file
const file = require('./keys.js');

// store keys object
keys = file.twitterKeys;
console.log(keys); // *test*

var input = process.argv;

var fullInput = "";

for (var i = 2; i < input.length; i++)
    if (i > 2 && i < input.length) {
        fullInput = fullInput + "+" + input[i]
    } else {
        fullInput += input[i]
    }

console.log(fullInput); // *test*