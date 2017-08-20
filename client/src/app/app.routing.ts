import {ModuleWithProviders} from  '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//Import user
import {UserEditComponent} from './components/user-edit.component';
import {ArtistListComponent} from './components/artist-list.component';
import {HomeComponent} from './components/home.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'artists/:page', component: ArtistListComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);