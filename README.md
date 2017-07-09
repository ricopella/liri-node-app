# LIRI Bot

### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

# Getting Started

Follow these instructions to clone the project and run on your local drive.

* **Please Note**: You must obtain `keys.js` by @ricopella in order for `my-tweets` and `spotify-this-song` to work.

### Prerequisites

You will need [Node.JS](https://www.npmjs.com/) and [NPM](https://nodejs.org/en/) installed on your system.

### Installing

1. Clone project: 

        `git clone https://github.com/ricopella/liri-node-app.git`
2. Inside the root directory of the cloned filed, run the following command in your terminal/bash:

        `npm install`

# Commands to run application

1.      `node liri.js my-tweets`
    * This returns the last 20 tweets and when they were created at in the terminal/bash window.

2.      `node liri spotify-this-song [song]`
    * Searches a song on spotify
    * Returns: Title, Artist, Album, and Preview URL

3.      `node liri.js movie-this [movie]`
    * Returns the following information about the requested movie:

       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

4.      `node liri.js do-what-it-says`
    * runs any commands you have run in the past

# Demo

![Demo](https://media.giphy.com/media/12lC1QmR9rpxmw/giphy.gif)

### Packages Used

* [Node.JS](https://www.npmjs.com/)
* [Twitter](https://www.npmjs.com/package/twitter)
* [Spotify](https://www.npmjs.com/package/spotify)
* [OMDb](https://www.npmjs.com/package/omdb)
* [Requests](https://www.npmjs.com/package/requests)
* [Colors](https://www.npmjs.com/package/colors)
* [log4js](https://github.com/nomiddlename/log4js-node)

### Log File

The file `log.txt` is a time-stamped documentation of output data from each application call. This will be created after your first applciation call and then will continue to append.
