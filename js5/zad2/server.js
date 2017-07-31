//Lets require/import the HTTP module
var http = require('http');
var HttpDispatcher = require('httpdispatcher');
const url = require('url');

var express = require('express');
var app = express();
//Lets define a port we want to listen to
const PORT=8080; 
//We need a function which handles requests and send response

//reate a server


app.get('/api/search', function(req, res){ 
    var parts = url.parse(req.url, true);
    
    const query =parts.query.query;
    const responseArray = ['Amazing arrivals', 'American lifestyle','Amazing moves','Amazing snowboard','Amazing mountains']
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    res.end(JSON.stringify(responseArray.filter((element)=>{return element.match(query)})));
 });
 
 app.use(express.static('public'));
 app.listen(PORT, function() {
   console.log("Listening on " + PORT);
 });
//Lets start our server

/*
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
function handleRequest(request, response){
   // response.end('It Works!! Path Hit: ' + request.url);
      console.log(request.url);
 
       dispatcher.dispatch(request, response);
       
}
//dispatcher.setStatic('resources');
dispatcher.onGet("/public", function(req, res) {
     return file.serve(req, response);
});
//A sample GET request    
dispatcher.onGet("/api/search", function(req, res) {
    var parts = url.parse(req.url, true);
    
    const query =parts.query.query;
    const responseArray = ['Amazing arrivals', 'American lifestyle','Amazing moves','Amazing snowboard','Amazing mountains']
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    res.end(JSON.stringify(responseArray.filter((element)=>{return element.match(query)})));
});
*/