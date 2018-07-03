var request = require('request');
var Twitter = require('twitter');
var port = process.env.PORT || 8000;
var express = require('express');
var path = require('path');
var Http = require('http');
var fs = require('fs');
var compression = require('compression');
var helmet = require('helmet');
var twilio = require('twilio');

var twilioClient = new twilio('AC2b409be51b1720d6ac8ef8206e3d5c5f', '0b340031c65e610c60b99ae11eb24f2c');


//intialize server
var app = express();
var server = Http.createServer(app);
app.use(compression());
app.use(helmet());
app.use(express.static('client'));


server.listen(port, function () {  // Starts server with our modfied port settings
});

app.use("/client", express.static(__dirname + '/client'));
app.all('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/client', 'index.html'));
});

app.get('/Message', function (req, res) {

	var content = fs.readFileSync("seriousTweets.json");
	var jsonContent = JSON.parse(content);
	var fullText = jsonContent[getRandomIntInclusive(0, 1968)].text;
	var n = fullText.indexOf("https://twitter.com");
	var newText = "";
	if (fullText.lastIndexOf("https:") != -1) {
		newText = fullText.substring(0, fullText.lastIndexOf("https:"));
	} else {
		newText += fullText;
	}
	if (newText.lastIndexOf("- Barry") != -1)
	{
		newText = newText.substring(0, newText.lastIndexOf("- Barry"));
	}

	const url = 'https://api.tronalddump.io/random/quote';
	request(url, function (error, response, body) {
		var json = JSON.parse(body);
		var value = json.value;
		var id = json.quote_id
		res.send(JSON.stringify({ right: newText, wrong: value }));
		//someone needs to fix these variable names LOL
	});
});




function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

app.get('/custommessage', function (req, res) {
    sendAlert(req.query.phone, req.query.message);
    res.send("HELLO");
  })

function sendAlert (phone, bodyMessage)
{
    var adjustedPhone = '+1' + phone;
    twilioClient.messages.create({
    to:adjustedPhone,
    from:'+16098314899',
    body:bodyMessage
}, function(error, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "false"
    if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
 
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
    }
});
}

