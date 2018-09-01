/*
1) I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)
2) If it does, it returns both the Unix timestamp and the natural language form of that date.
3) If it does not contain a date or Unix timestamp, it returns null for those properties.
Example usage:
https://timestamp-ms.herokuapp.com/December%2015,%202015
https://timestamp-ms.herokuapp.com/1450137600
Example output:
{ "unix": 1450137600, "natural": "December 15, 2015" }
*/

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

var dateFormattingOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

app.get('/:dateVal', function(req, res) {
    var dateVal = req.params.dateVal;
    if (isNaN(dateVal)) {
        var naturalDate = new Date(dateVal);
        naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
        var unixDate = new Date(dateVal).getTime()/1000;
    } else {
        var unixDate = dateVal;
        var naturalDate = new Date(dateVal*1000);
        naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
    }
    res.json({unix: unixDate, natural: naturalDate});
});

app.listen(3000);
