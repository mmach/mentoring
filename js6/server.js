//Lets require/import the HTTP module
const http = require('http');
const HttpDispatcher = require('httpdispatcher');
const url = require('url');
const bodyParser = require('body-parser')
const  express = require('express');
const fs = require('fs')
const app = express();
//Lets define a port we want to listen to
const PORT=8080; 
//We need a function which handles requests and send response

//reate a server
app.use( bodyParser.json() );    
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

 app.post('/api/search', function(req, res){ 
    const query = req.body.query;
    //console.log(parts,req.body);
    //const query =parts
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