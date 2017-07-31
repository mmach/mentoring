//Lets require/import the HTTP module
var http = require('http');
var HttpDispatcher = require('httpdispatcher');
const url = require('url');
var bodyParser = require('body-parser')
var express = require('express');
var cors = require('cors')
fs = require('fs')
var app = express();
//Lets define a port we want to listen to
const PORT=8085; 
//We need a function which handles requests and send response
app.use(cors());
//reate a server
app.use( bodyParser.json() );    
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

 app.post('/api/search', function(req, res){ 
    const query = req.body.query;
    const responseArray = [];
    fs.readFile('./slowa.txt', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    data.split('\r\n').map(function(element){
        if(element.match(query))
        {
            console.log(element);
            responseArray.push(element);
            
        }}
        );
        res.writeHead(200, {'Content-Type': 'text/plain'});
    
        res.end(JSON.stringify(responseArray.filter((element)=>{return element.match(query)})));
});
    
 });
 
 app.listen(PORT, function() {
   console.log("Listening on " + PORT);
 });
