import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharactersComponent } from './characters/characters.component';
import { CharacterEditComponent } from './characters/character-edit/character-edit.component';
import { CharacterDetailComponent } from './characters/character-detail/character-detail.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full'},
  { path: 'characters', component: CharactersComponent, children: [
      { path: 'new', component: CharacterEditComponent },
      { path: ':id', component: CharacterDetailComponent },
      { path: ':id/edit', component: CharacterEditComponent }
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
