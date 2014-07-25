'use strict';
var ical = require('../../app/controllers/ical')
module.exports = function(app) {
	// Root routing
	app.route('/event').get(ical.returnEvent);
	app.route('/eventparser').get(ical.parseEvent);
};