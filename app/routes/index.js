'use strict';

var path = process.cwd();
var pollController = require('../controllers/pollcontroller.js');


module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}

	app.route('/')
		.get(function (req, res) {
			
			var loggedin = req.isAuthenticated()
			
			var context = {
				loggedin: loggedin
			}
			
			if (loggedin == true) {
				context.user = req.user;
			}
			
			pollController.getAllPolls().then (function (polls) {
				context.polls = polls;
				res.render("home", context);
			});
			
			
		});
		
	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			
			var loggedin = req.isAuthenticated();
			
			var user = req.user;
			var user_info = req.user.twitter;
			var polls = req.user.polls;
			
			
			var context = {
				loggedin: loggedin,
				user: user,
				user_info: user_info,
			}
			
			pollController.getPolls(polls).then (function (polls) {
				context.polls = polls;
				res.render('profile', context);
			});
			
			
		})
	
	app.route('/polls/:pollid')
		.get(function (req, res) {
			var pollid = req.params.pollid;
			res.json(pollid);
		})
	
		
	app.route('/createpoll')
		.get(isLoggedIn, function (req, res) {
			
			var loggedin = req.isAuthenticated();
			
			var user = req.user;
			
			var context = {
				loggedin: loggedin,
				user: user
			}
			
			res.render('createpoll', context);
			
			
		})
		
		.post(isLoggedIn, function (req, res) {
			
			var parsed_model = req.body;
			
			var new_poll_choice = req.body['poll-choice'].split(/\r\n/);
			
			parsed_model['poll-choice'] = new_poll_choice;
				
			pollController.createPoll(req, res, parsed_model);
			
			
		})
		
	app.route('/deletepoll')
		.post(isLoggedIn, function (req, res) {
			
			var poll_id = req.body.poll;
			
			pollController.deletePoll(req, res, poll_id);
			
		})

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.twitter);
		});
		
	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));
		
	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}))

};
