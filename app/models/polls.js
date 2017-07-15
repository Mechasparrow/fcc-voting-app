'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	pollname: String,
	options: [{choice: String}],
	votes: [{choice: String}]
});

module.exports = mongoose.model('Poll', Poll);
