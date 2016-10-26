'use strict';

var Users = require('../models/users.js');

function ClickHandler () {

	this.getClicks = function (req, res) {
		Users
			.count({ bars: (req.query.yelpID)})
			.exec(function(err,result) {
				if(err) { throw err }
				res.json(result);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, {$push :{ bars:req.query.yelpID }})
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
				}
			);
	};

	this.removeClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, { $pull:{ bars: req.query.yelpID }})
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
				}
			);
	};

}

module.exports = ClickHandler;
