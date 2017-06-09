# Mixtape JS

This is a simple music player that takes away the ability to change songs. You can only play or pause. The app also keeps track of the song and time you paused it on so when you come back to it it will start playing from your last position.

The idea of making this app is to emulate or copy the behavior that Old-School Cassette Tapes used to have. With so many player options out there people rarely stay put and listen to a playlist from beggining to end. This app forces you to listen to every song in the intender order.

## Features

Right now the app has a short list of features:

- Plays a predefined playlist from beginning to end remembering the points where the user paused it.
- Lists the artist and title of each song in the playlist.

However, some more features are planned for the future:

- Possibility for users to upload their own songs and arrange their personal playlist.
- The track list will be slowly appearing as you listen to the songs in the playlist.

## Flavors

There are two flavors of MixtapeJS: An Online Webapp and a Desktop App.

### Online Webapp

Because this is a small project that I work on in my free time and not a big corporation with money for big servers right now the Webapp is only a Demo.

You can find the WebApp demo [here](http://mixtape-js.herokuapp.com). (It also works on mobile.)

### Desktop App

The desktop app can be a little bit more flexible. Because is an offline app, you can listen to the playlist without worrying about internet connection.
The app is a self-contained executable that doesn't need installing.You can take it anywhere!

To download the desktop version go to the releases part of this repository. [Right here](https://github.com/grochadc/mixtape-js/releases)

The app comes packaged to work on Windows 32 and OSX 64. (More OS compatibility coming soon)

## For Developers

This app is written mostly in Javascript with some help from HTML5 and CSS. Both flavors use nodejs as a base but the main difference is that the webapp is an Express server and the desktop version is packaged with NW.js

The webapp code is in the `master` branch and the Desktop version is in the branches that start with `nwjs` for Dev version see `nwjs-sdk` branch and fo the code to package it look at `nwjs-production` branch.

If you're interested in running the web app in your local enviroment you can clone the repo to your local machine install all the dependencies with npm and type `npm start` to start a server listening on port 3000.

Assuming you have Git, Nodejs and Npm installed.:

```
$ git clone https://github.com/grochadc/mixtape-js.git
$ cd mixtape-js/
$ npm install
$ npm start
```
Then open a browser and go to: `localhost:3000`

## Thanks

Many thanks to all the open source projects that this app is based on:

- Node
- npm
- NWjs
- jQuery

The drawing of the tape in the app is made by Tom Hazliedine and I took it from his [CodePen](https://codepen.io/tomhazledine/)
