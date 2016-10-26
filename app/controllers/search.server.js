'use strict';

require('dotenv').load();
var Yelp = require("yelp");
var yelp = new Yelp({
    consumer_key:process.env.YELP_KEY,
    consumer_secret:process.env.YELP_SECRET,
    token:process.env.YELP_TOKEN,
    token_secret:process.env.YELP_TOKEN_SECRET
});
function search(req,res) {
    yelp.search({ term:'night life', location:req.query.location})
    .then(function(data) {
        res.json(data.businesses);
    })
    .catch(function(err) {
        throw err;
    });
}

module.exports = search;