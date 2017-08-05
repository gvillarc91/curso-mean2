'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
	titulo: String,
	description: String,
	year: Number,
	image: String,
	artist: { type: Schema.ObjectId, ref: 'Artist' }
});

//Pluraliza el artist el solo
module.exports = mongoose.model('Album', AlbumSchema);
