'use strict';

require('dotenv').load();
var Yelp = require("yelp");
var Users = require('../models/users.js');
var yelp = new Yelp({
    consumer_key:process.env.YELP_KEY,
    consumer_secret:process.env.YELP_SECRET,
    token:process.env.YELP_TOKEN,
    token_secret:process.env.YELP_TOKEN_SECRET
});
function search(req,res) {
    //save location setting for user
	Users
	.findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, {'location':req.query.location})
	.exec(function (err, result) {
			if (err) { throw err; }
		}
	);
    
    //search on yelp
    yelp.search({ term:'night life', location:req.query.location})
    .then(function(data) {
        res.json(data.businesses);
    })
    .catch(function(err) {
        throw err;
    });
}

module.exports = search;