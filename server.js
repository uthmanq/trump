var request = require('request');
var Twitter = require('twitter');
var port = process.env.PORT || 8000;
var express = require('express');
var path = require('path');
var Http = require('http');
var fs = require('fs');
var compression = require('compression');
var helmet = require('helmet');

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

