var Alexa = require('alexa-sdk');
var fetch = require('node-fetch');

exports.handler = function(event, context, callback) {
	var alexa = Alexa.handler(event, context);

	alexa.registerHandlers(handlers);
	alexa.execute();
};

var handlers = {
	'LaunchRequest': function() {
		this.emit(':tell', 'Hi from COSI Place');
	},
	'PlaceIntent': function() {
		let color = parseInt(this.event.request.intent.slots.color.value) || 0;
		let x = parseInt(this.event.request.intent.slots.x.value) || 0;
		let y = parseInt(this.event.request.intent.slots.y.value) || 0;
		let obj = { color, x, y };
		fetch('http://place.cosi.clarkson.edu/api/place', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
				body: JSON.stringify(obj)
			})
			.then(res => res.text())
			.then(text => this.emit(':tell', text))
			.catch(err => this.emit(':tell', err));
	},
	'SpecialPlaceIntent': function() {
		this.emit(':tell', 'Oh dear. I am so sorry');
	}
};
