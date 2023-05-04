// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", (req, res) => {
  let date;

  if (req.params.date) {
    const dateString = req.params.date;
    // Check if the input string is a Unix timestamp
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
      // If the input date string is not a valid date, return an error message
      if (isNaN(date.getTime())) {
        return res.json({ error: "Invalid date" });
      }
    }
  } else {
    // If no date is provided, use the current time
    date = new Date();
  }

  const unixTimestamp = date.getTime();
  const utcString = date.toUTCString();

  // Return the Unix timestamp and UTC string in a JSON object
  res.json({ unix: unixTimestamp, utc: utcString });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
