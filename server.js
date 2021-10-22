// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var dateHandler = function(req,res) {
  var timeStr = req.params.date;

  if(Number(req.params.date))
    timeStr = Number.parseInt(req.params.date);

  var timestamp = new Date(timeStr);
  if(timestamp.getUTCHours() > 0)
    timestamp = new Date(timestamp.getTime() + timestamp.getTimezoneOffset() * -60000);

  if(isNaN(timestamp))
    res.json({error:"Invalid Date"});
  else
    res.json({unix:timestamp.getTime(), utc:timestamp.toUTCString()});
}

var emptyDateHandler = function(req,res) {
  var nowDate = new Date(Date.now());
  res.json({unix:nowDate.getTime(), utc:nowDate.toUTCString()});
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", dateHandler);
app.get("/api/", emptyDateHandler);

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen("3000", function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
