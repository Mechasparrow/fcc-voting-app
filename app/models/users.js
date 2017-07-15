'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = require('./polls');

var User = new Schema({
	twitter: {
	    id: String,
	    username: String
	},
	polls: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Poll'
	}]
});

module.exports = mongoose.model('User', User);
