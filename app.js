var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res){
  res.sendFile('manageTime.html');
});

app.listen(1337);

console.log("The app is Listening on port 1337");