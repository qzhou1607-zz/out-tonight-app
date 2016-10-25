'use strict';

var Users = require('../models/users.js');

function ClickHandler () {

	this.getClicks = function (req, res) {
		Users
			.findOne({ 'twitter.id': req.user.twitter.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, { })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.twitter.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result);
				}
			);
	};

}

module.exports = ClickHandler;
