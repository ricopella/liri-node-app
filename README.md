# LIRI Bot

### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

# Getting Started

Follow these instructions to clone the project and run on your local drive.

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
    * runs any commans you have run in the past

### Packages Used

* [Node.JS](https://www.npmjs.com/)
* [Twitter](https://www.npmjs.com/package/twitter)
* [Spotify](https://www.npmjs.com/package/spotify)
* [OMDb](https://www.npmjs.com/package/omdb)
* [Requests](https://www.npmjs.com/package/requests)
* [Colors](https://www.npmjs.com/package/colors)

