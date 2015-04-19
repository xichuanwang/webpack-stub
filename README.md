# Webpack-stub
This is a stub setup for an application that requires module dependencies.

## Features
* Seperation of vendor dependencies.
* Seperate css file
* Static asset copying from source to distribution
* HTML templating via mustache-loader/hogan.js
* Compilation and minification build process
* jQuery
* SASS compilation via node-sass->libsass wrapper

## Development
Development build will output compiled javascript into a single javascript file as well as a compiled css file. Webpack will setup watch for file changes, but this __does not__ trigger a reload in the browser.

### Getting Started
* Clone this repo
* `npm install`
* `npm start` to start development build and watch.
* `npm run build` to build files for production. Minify js and css.

### TODO
* Node.js/Express server to start up a live reload server using `webpack-dev-server`.
* Allow multi-entry points

### Notes
* Be sure to customize `webpack.config.js` to fit your project before you starting development.
