'use strict';

//const webpack = require('webpack'),
//         path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//const extractLESS = new ExtractTextPlugin('./public/two.css');
 
const config = [{
  name:'js',
  entry: ['./public/app.js','./public/awesomplete.js','./public/architecture.js','./public/helper.js','./public/city_guide.scss','./public/awesomplete.css'
  ],
  output: {
    path:__dirname +'/public',
    filename: 'bundle.js'
  },
  "target": "node",

 module: {
    rules: [
    
      { // sass / scss loader for webpack
        test: /\.(css|sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
   plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'bundle.css',
      allChunks: true,
    }),
    //if you want to pass in options, you can do so: 
    //new ExtractTextPlugin({ 
    //  filename: 'style.css' 
    //}) 
  ]
}];
 
module.exports = config;