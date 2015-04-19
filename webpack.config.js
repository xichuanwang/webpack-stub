// Webpack require
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Package.json alias
var pkg = require('./package.json');

// Path to node_modules directory
var nodeModulesDir = __dirname + '/node_modules';

// Setup source path
var srcPath = '/src/';

// Array of paths to different js entry files
var entryFiles = [
    __dirname + srcPath + 'main.js'
    // ... another entry js file
];

// Third Party vendors list
var vendors = {
    jquery: nodeModulesDir + '/jquery/dist/jquery.min.js'
    // ... another vendor
}

// Setup global free variables to be used throughout the project as constants
// ex: if(VERSION === '1.0.0')
var Globals = {
    VERSION: JSON.stringify(pkg.version)
};

// Webpack Configuration Shortcut
var config = {

    // Setup each module's source file entrypoint. The object key used here will be used
    // as the output file name (ex: app.bundle.js)
    entry: {
        appName: entryFiles,
        vendors: (function () {
            var arr = [];
            for (v in vendors) {
                arr.push(v);
            }
            return arr;
        })()
    },

    // Setup path for all ouput file
    // Setup filename for build. [name] will reference each object key in the "entry" object
    output: {
        path: __dirname + '/dist/js/',
        filename: '[name].bundle.js'
    },

    resolve: {
        // Simple aliasing of vendor libraries
        alias: vendors
    },

    // Setup module loaders
    module: {
        // These files shoud be already minified don't need to process these guys
        noParse: (function () {
            var arr = [];
            for (v in vendors) {
                arr.push(vendors[v]);
            }
            return arr;
        })(),

        // Specific loaders for each type of file
        loaders: [
            // HTML Template loader - Mustache in this case
            { test: /\.(html|mustache)$/, loader: 'mustache' },

            // JSON Loader
            { test: /\.(json)$/, loader: 'json' },

            // CSS/[SASS,SCSS] loading
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },

            // Font loading
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader' },

            // Copying static image assets to output folder
            { test: /\.(png|gif|jpg|jpeg)$/, loader: 'file?name=../img/[name].[ext]'},
        ]
    },

    plugins: [
        // output all css into a single external file, rather than having it compiled with the source
        new ExtractTextPlugin('../css/[name].css'),

        // Break out vendor files into a single file separate from the main app
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),

        // Register global free variables as constants
        new webpack.DefinePlugin(Globals)
    ]
};

// The drop off
module.exports = {
    entry: config.entry,
    output: config.output,
    resolve: config.resolve,
    module: config.module,
    plugins: config.plugins,
    devServer: config.devServer,
};