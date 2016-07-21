var BundleTracker = require('webpack-bundle-tracker')
var webpack = require('webpack')

var config = require('./webpack.base.config.js')

config.output.path = require('path').resolve('./frontend/static/bundles/prod/')

config.plugins = config.plugins.concat([
    new BundleTracker({filename: './webpack-stats-prod.json'}),

    // removes a lot of debugging code in REact
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
            'BASE_API_URL': JSON.stringify('https://dothebucket.herokuapp.com/api/v1'),
        }
    }),

    // keeps hashes consistent between compilations
    new webpack.optimize.OccurenceOrderPlugin(),

    // minifies your code
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    })
])

// Add a loader for JSX files
config.module.loaders.push(
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'   
    }
)

module.exports = config

