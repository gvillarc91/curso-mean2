'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = Schema({
	number: Number,
	name: String,
	duration: Number,
	file: String,
	album: { type: Schema.ObjectId, ref: 'Album' }
});

//Pluraliza el artist el solo
module.exports = mongoose.model('Song', SongSchema);
