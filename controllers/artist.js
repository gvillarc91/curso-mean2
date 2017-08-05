'use strict'

//Incluyo sistema de ficheros
var fs = require('fs');
var path = require('path');

var Album = require('../models/album');
var Artist = require('../models/artist');
var Song = require('../models/song');

function getArtist(req, res){
	res.status(200).send({message: 'Método getArtist del controlador Artist.js'});
}

module.exports = {
	getArtist
};

