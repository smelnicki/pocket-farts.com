## pocket farts

Because... who wouldn't want a progressive web fart app?

### Introduction

You might be wondering, "Stephen, what the hell is a progress web fart app?" Possibly even, "who would even *want* that?"

Well, if you find farts funny... have I got the app for you.

Now, a progressive web fart app is simply a progressive web app... only for farts. Progressive web apps, according to google,

> use modern web capabilities to deliver an app-like user experience.
> They evolve from pages in browser tabs to immersive top-level apps, leveraging the web's
> low friction.

They go on further to say,

> Progressive Web Apps are experiences that combine the best of the web and the best of apps. They are useful to users from
> the very first visit in a browser tab, no install required. As the user progressively builds a relationship with the App
> over time, it becomes more and more powerful. It loads quickly, even on flaky networks, sends relevant push notifications,
> has an icon on the home screen and loads as top-level, full screen experience.

Now that's quite a bit to consume, so I'll break it down. I would say the defining qualities of a progressive web app are:

* **Responsive** - Seamlessly supports desktop, tablet and mobile.
* **Installable** - Can be 'installed' via adding to the homescreen. No app store required.
* **App-like** - After it has been installed, indistinguishable in appearance and behavior from a native app.

That last bit is the most important. And that's what I've attmped to prove, in concept at least.

I'll elaborate more on each point, shortly. For now, on with the show.

### Installation

To try it out live, grab your favorite device and open it up to [pocket-farts.com](https://pocket-farts.com).

![screenshot-pre-install](https://raw.githubusercontent.com/smelnicki/pocket-farts.com/master/screenshots/pre-install.png)

If you're on safari, you can install via the 'add to homescreen button'

![add-to-homescreen](https://raw.githubusercontent.com/smelnicki/pocket-farts.com/master/screenshots/add-to-homescreen.gif)

And after you've 'installed' it, start it up and it should look like the genuine article

![screenshot-post-install](https://raw.githubusercontent.com/smelnicki/pocket-farts.com/master/screenshots/post-install.png)

### Structure

```
.
├── LICENSE.md            # licenses are important
├── README.md             # what you're reading right meow
├── build.config.js       # rollup.js configuration to bundle my javascript files together
├── npm-shrinkwrap.json   # version locking my dependencies
├── package.json          # json file containing all required dependencies and houses all commands
├── screenshots           # self explanatory
└── src
    ├── favicon.ico         # app icon to show up in your browser tab
    ├── img                 # images directory
    │   ├── apple-touch-icon-*.png  # app icons for apple tablet and phone (and their respective retina flavors)
    │   ├── icon-*.png      # app icons for android tablet and phone
    │   └── icon.png        # image for the app's button
    ├── index.html          # self explanatory. includes meta information to configure 'installation' for chrome and safari
    ├── js                  # app's source files
    │   ├── app.js          # application entry point. initializes the fart button and service worker.
    │   ├── fart-button.js  # click event binding to fire off fart noises
    │   ├── fart.js         # handles making network requests and playing .mp3 files
    │   └── service-worker.js       # service worker config. caches resources and serves them whenever a network request comes through matching one.
    ├── manifest.json       # web app manifest file
    ├── sounds
    │   ├── fart*.mp3     # various fart sounds
    └── styles
        └── app.css       # app stylesheet
├── node_modules    # self explanatory
└── dist            # build artifact directory
```


### Quickstart

```
# You'll need node and npm installed.
# I use node v5.9.0 and npm 3.7.3
node --version
npm --version

npm install     # install all required dependencies
npm start       # compiles source and starts up a server at http://localhost:3000
```

### Commands

The entire app is controlled via npm scripts.

They're all pretty straightforward, with some additional ones to simply streamline similar commands.

```
npm run lint    # runs the linter on all javascript files under src/
npm run clean   # removes the directory where we place all generated assets, dist/
npm run copy-static   # copies all static assets (like index.html, manifest.json and favicon() to dist/
npm run copy-sounds   # copies all sound files to dist/sounds
npm run copy-img      # copies all images to dist/sounds
npm run assets        # runs the previous three commands sequentially
npm run copy-whatwg-fetch   # minifies fetch() polyfill and ouputs result to dist/vendor
npm run copy-es6-promise    # minifies promise polyfill and output result to dist/vendor
npm run vendor  # runs the previous two commands
npm run css     # runs the postcss processor on src/styles/app.css and outputs result to dist/styles
npm run compile # runs rollup.js with config from build.config.js file
npm run build   # cleans, copies assets, minifies vendor polyfills, and compiles javascript
npm run watch   # watches the 'src/' directory and runs build command on any change
npm run serve   # spins up an http server from the dist/ directory on localhost:3000
npm start       # runs 'build' and 'serve' commands simultaneously
```

### License

WTFPL. See [LICENSE.md](https://raw.githubusercontent.com/smelnicki/pocket-farts.com/master/LICENSE.md).

### Credit

There were a number of sources of inspiration here, so I'll do my best to credit each one.

* [Ken Wheeler](https://github.com/kenwheeler) and his amazing [app](https://twitter.com/ken_wheeler/status/581171786747899904) from months past.
* [airhorner.com](https://airhorner.com/) and its subsequent [breakdown](https://developers.google.com/web/fundamentals/getting-started/your-first-offline-web-app/) ala Google Developer network. Thanks, Google!
* [Nolan Lawson](https://github.com/nolanlawson) and his [pokedex](https://www.pokedex.org/) project.

### Contributing

Got an idea? Comment? Concern?

Take a gander at [CONTRIBUTING.md](https://raw.githubusercontent.com/smelnicki/pocket-farts.com/master/CONTRIBUTING.md) and feel free to submit an issue.

