var request =  require('request');
var Twitter = require('twitter');
var port = process.env.PORT || 8000;
var express = require('express');
var path = require('path');
var Http = require('http');

//intialize server
var app = express();
var server = Http.createServer(app);
app.use(express.static('client'));

server.listen(port, function () {  // Starts server with our modfied port settings
});

app.get('/fakeMessage', function(req, res)
{	
	answerChoice(fakeParams, function (answer){
		res.send('<p>'+answer+'</p>');
	});
})

app.get('/realMessage', function(req, res)
{
	console.log("got request");
	answerChoice(realParams, function (answer){
		res.send('<p>'+answer+'</p>');
	});
})
app.all('/',function(req,res)
{
	res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

var client = new Twitter(
	{
		consumer_key: 'A5p2fvRkVsS2m0cb040qM69LQ',
  		consumer_secret: 'y0QWdCdrROP9bK7Ozxjb80tJCbF5klLqfeiPOjPFoyrTL2AzJM',
  		bearer_token: 'AAAAAAAAAAAAAAAAAAAAALWu5QAAAAAAiff0YkvWzy83bnoDyPcfspJbc60%3DMZBjoZXuIOmXTjiSOV5hQmJdjjr5FD71Sfwd2uAPn7OeGCyn2p'
	}
)
var fakeParams = {screen_name: 'realDonalDrumpf', tweet_mode: 'extended'};
var realParams = {screen_name: 'realDonaldTrump', tweet_mode: 'extended'};

function answerChoice(params, callback)
{client.get('statuses/user_timeline', params, function(error, data, response) 
	{
	if (!error) 
		{
		var searchCount = JSON.stringify(data);
		var count = (searchCount.match(/full_text/g) || []).length;
		console.log(count);
		callback(data[getRandomIntInclusive(0,count-3)].full_text);
		}
  	});
}
// const url = 'https://api.tronalddump.io/random/quote';
// request(url, function (error, response, body) {
// 	var json = JSON.parse(body);
// 	var value = json.value;
// 	var id = json.quote_id
// 	console.log(value);
// 	console.log(id);
// });

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
	}