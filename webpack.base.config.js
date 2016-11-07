var path = require("path")
var webpack = require('webpack')

module.exports = {
    context: __dirname,

    entry: {
        // Defines the JS file that will be loaded first
        App1: './reactjs/App1',
        vendors: ['react'],
    },

    output: {
        path: path.resolve('./bucketlist/frontend/static/bundles/local/'),
        filename: "[name]-[hash].js"
    },

    // should contain all vendor libs
    externals: [],

    // contains all common plugins
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    ],

    module: {
        loaders: []
    },

    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx']
    },
}