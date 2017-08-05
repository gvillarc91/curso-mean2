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

function saveArtist(req, res){
	
	var params = req.body;

	var artist = new Artist();
	artist.name = params.name;
	artist.description = params.description;
	artist.image = 'null';

	artist.save((err, artistStored)=>{
		if(err){
			res.status(500).send({message: 'Error al guardar el artista'});
		}else{
			if(!artistStored){
				res.status(404).send({message: 'El artista no ha sido guardado'});
			}else{
				res.status(200).send({artist: artistStored});
			}
		}
	});
}

module.exports = {
	getArtist,
	saveArtist
};

