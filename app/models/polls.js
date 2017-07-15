'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	pollname: String,
	options: [String],
	votes: [String]
});

module.exports = mongoose.model('Poll', Poll);
