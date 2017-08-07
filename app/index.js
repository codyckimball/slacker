const cody = require('./cody')
var people = [cody.status()]
var request = require('request');

/*
const CalendarAPI = require('node-google-calendar');
const CONFIG = require('../settings.js');
let cal = new CalendarAPI(CONFIG);
*/

for (var i = 0; i < people.length; i++) {
	console.log(typeof people);
	var slacker = people[0]
	var token = slacker['token']
	delete slacker.token
	console.log(slacker);
	var yeps = encodeURIComponent(JSON.stringify(slacker))
	request.post({url:'https://slack.com/api/users.profile.set?token='+token+'&profile='+yeps}, function(err,httpResponse,body){ 
		//console.log(httpResponse)
		console.log(body);
	 })
}

