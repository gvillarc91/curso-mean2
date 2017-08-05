'use strict'

//Incluyo sistema de ficheros
var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Album = require('../models/album');
var Artist = require('../models/artist');
var Song = require('../models/song');

function getArtist(req, res){

	var artistId = req.params.id;

	Artist.findById(artistId, (err, artist)=>{

		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!artist){
				res.status(404).send({message: 'El artista no existe'});
			}else{
				res.status(200).send({artist});
			}
		}

	});

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

function getArtists(req, res){

	if(req.params.page){

		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPage =  3;

	Artist.find().sort('name').paginate(page, itemsPage, function(err, artists, total){
		
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!artists){
				res.status(404).send({message: 'No hay artistas'});
			}else{
				return res.status(200).send({
					total_items: total,
					artists: artists
				});
			}
		}

	});

}

function updateArtist(req, res){

	var artistId = req.params.id;
	var update = req.body;

	Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated)=>{
		
		if(err){
			res.status(500).send({message: 'Error al actualizar el artista'});
		}else{
			if(!artistUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el artista'});
			}else{
				res.status(200).send({artist: artistUpdated });
			}
		}
	});
}

function deleteArtist(req, res){

	var artistId = req.params.id;

	Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
		
		if(err){
			res.status(500).send({message: 'Error al eliminar el artista'});
		}else{
			if(!artistRemoved){
				res.status(404).send({message: 'No se ha podido eliminar el artista'});
			}else{
				res.status(404).send({artistRemoved});
				
				Album.find({ artist: artistRemoved._id}).remove((err, albumRemoved) => {

					if(err){
						res.status(500).send({message: 'Error al eliminar el album'});
					}else{
						if(!albumRemoved){
							res.status(404).send({message: 'No se ha podido eliminar el album'});
						}else{
							
							Song.find({ album: albumRemoved._id}).remove((err, songRemoved) => {

									if(err){
										res.status(500).send({message: 'Error al eliminar la cancion'});
									}else{
										if(!songRemoved){
											res.status(404).send({message: 'No se ha podido eliminar la cancion'});
										}else{ res.status(200).send({artistRemoved});}
									}
							});
						}
					}

				});
			}
		}
	});
}




module.exports = {
	getArtist,
	saveArtist,
	getArtists,
	updateArtist,
	deleteArtist
};

