'use strict'

//Incluyo sistema de ficheros
var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Album = require('../models/album');
var Artist = require('../models/artist');
var Song = require('../models/song');

function getAlbum(req, res){

	var albumId = req.params.id;

	Album.findById(albumId).populate({path: 'artist'}).exec((err,album)=>{

		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!album){
				res.status(404).send({message: 'El album no existe'});
			}else{
				res.status(200).send({album});
			}
		}

	});
}


function saveAlbum(req, res){
	
	var album = new Album();
	var params = req.body;

	album.title = params.title;
	album.description = params.description;
	album.year = params.year;
	album.image = 'null';
	album.artist = params.artist;

	album.save((err, albumStored)=>{
		if(err){
			res.status(500).send({message: 'Error al guardar el album'});
		}else{
			if(!albumStored){
				res.status(404).send({message: 'El album no ha sido guardado'});
			}else{
				res.status(200).send({album: albumStored});
			}
		}
	});
}

function getAlbums(req, res){

	var artistId = req.params.artist;
	if(!artistId)
	{
		//sacar todos los albums de la bd
		var find = Album.find({}).sort('title');

	}else{

		//Sacar todos los albums de un artista concreto de la bd
		var find = Album.find({artist: artistId}).sort('year');
	}

	find.populate({path: 'artist'}).exec((err, albums)=>{
		
		if(err){
				res.status(500).send({message: 'Error en la petición'});
			}else{
				if(!albums){
					res.status(404).send({message: 'No hay albums'});
				}else{
					res.status(200).send({albums});
				}
		}

	})

}

function updateAlbum(req, res){

	var albumId = req.params.id;
	var update = req.body;

	Album.findByIdAndUpdate(albumId, update, (err, albumUpdated)=>{
		
		if(err){
			res.status(500).send({message: 'Error al actualizar el album'});
		}else{
			if(!albumUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el album'});
			}else{
				res.status(200).send({artist: albumUpdated });
			}
		}
	});
}

function deleteAlbum(req, res){

	var albumId = req.params.id;

	Album.findByIdAndRemove(albumId, (err, albumRemoved) => {

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
										}else{ res.status(200).send({albumRemoved});}
									}
							});
						}
					}

		});
}


function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/albums/' + imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imágen'});
		}
	});
}

function uploadImage(req, res){
	var albumId = req.params.id;
	var file_name = 'Imagen no subida...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		//console.log(ext_split);

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' )
		{
			Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated) => {
				
				if(!albumUpdated){
					res.status(404).send({message: 'No se ha podido actualizar la imagen'});
				}else{
					res.status(200).send({artist: albumUpdated });
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no válida'});
		}

	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}

}

module.exports = {
	getAlbum,
	saveAlbum,
	getAlbums,
	updateAlbum,
	deleteAlbum,
	getImageFile,
	uploadImage
};
