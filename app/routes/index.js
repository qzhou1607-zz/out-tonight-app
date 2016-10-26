'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var Users = require(path + '/app/models/users.js');
var search = require(path + '/app/controllers/search.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});


	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});
		
	app.route('/api/search') 
		.get(search);
		
	app.route('/api/:id')
		.get(function (req, res) {
			if(req.user) { 
				Users.findOne({'twitter.id':req.user.twitter.id},{'_id':false})
                .exec( function(err,result) {
                    if(err) {
                        throw err;
                    } 
                    if (result) {
                         res.json(result);
                    } 
                    
                });
			} else {
				res.json({status:"guest"});
			}
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/'
		}));

	app.route('/api/:id/clicks')
		.post(isLoggedIn,clickHandler.addClick)
		.delete(isLoggedIn,clickHandler.removeClick)
		.get(clickHandler.getClicks)
};
