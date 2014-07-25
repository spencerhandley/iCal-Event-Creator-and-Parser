'use strict';

/**
 * Module dependencies.
 */
var iCalEvent = require('icalevent');
var ical = require('ical');
var fs = require('fs');

var event = new iCalEvent({
    uid: 9873647,
    offset: new Date().getTimezoneOffset(),
    method: 'request',
    status: 'confirmed',
    attendees: [
        {
            name: 'Johnny Boy',
            email: 'johnny@numberfive.com'
        },
        {
            name: 'Homer Simpson',
            email: 'homer@powerplant.com'
        }
    ],
    start: '2014-07-01T02:00:00-05:00',
    end: '2014-07-01T02:30:00-05:00',
    timezone: 'US/Central',
    summary: 'Priestly Duties',
    description: 'Home flu visit.',
    location: 'Casa',
    organizer: {
        name: 'Nacho Libre',
        email: 'luchador@monastery.org'
    },
    url: 'http://google.com/search?q=nacho+libre'
});

exports.parseEvent = function(req, res) {
	var calArr = []
	ical.fromURL('http://lanyrd.com/topics/nodejs/nodejs.ics', {}, function(err, data){
		for (var k in data){
	        if (data.hasOwnProperty(k)) {
	          var ev = data[k]
	          console.log(ev)
	          calArr.push(ev)
	        }
      	}
    console.log("array", calArr)

	})
}

exports.returnEvent = function(req, res){
	console.log(event.toFile())
	var eventfile = event.toFile()
	fs.writeFile("/tmp/event.ics", event.toFile(), function(err){
		if(err) throw err
		console.log("saved!")
		res.download ('/tmp/event.ics');
	})
	// res.setHeader('Content-disposition', 'attachment; filename=dramaticpenguin.MOV')
}

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null
	});
};