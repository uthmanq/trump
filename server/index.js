var request =  require('request');


const url = 'https://api.tronalddump.io/random/quote';

    request(url, function (error, response, body) {
	   
	    var json = JSON.parse(body);
	    var value = json.value;
	    var id = json.quote_id
	    console.log(value);
	    console.log(id);

		});
