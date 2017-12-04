import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {AlbumService} from '../services/album.service';

import {Album} from '../models/album';

@Component({
	selector: 'album-detail',
	templateUrl: '../views/album-detail.html',
	providers: [UserService, AlbumService]
})

export class AlbumDetailComponent implements OnInit{
	
	public Album: Album;
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public albums: Album[];

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _albumService: AlbumService

	){
		this.identity= this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log('album-detail-component.ts cargado');

		//Sacar album de la BD
		this.getAlbum();
	}

	getAlbum(){
		console.log("El metodo funciona");
		/*this._route.params.forEach((params: Params)=>{
			let id = params['id'];
			this._artistService.getArtist(this.token, id).subscribe(
					response => {
						
						if(!response.artist){
							this._router.navigate(['/']);
						}else{
							this.artist = response.artist;

							//Sacar los albums del artista
							this._albumService.getAlbums(this.token, response.artist._id).subscribe(
								response =>{
								
									if(!response.albums){
										this.alertMessage = "Este artista no tiene albums";
									}else{
										this.albums = response.albums;
									}
								},
								error => {
		              		      var errorMessage = <any>error;
		                     	  var body = JSON.parse(error._body);
		                     	 console.log(error);
		         				 }
							);
						}
					},
					error => {
		                    var errorMessage = <any>error;
		                      var body = JSON.parse(error._body);
		                      console.log(error);
		              
		         	 }
			);
		})
			*/
	}


}