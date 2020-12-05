import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './characters/character-detail/character-detail.component';
import { CharacterEditComponent } from './characters/character-edit/character-edit.component';
import { CharacterItemComponent } from './characters/character-item/character-item.component';
import { CharactersFilterPipe } from './characters/characters-filter.pipe';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { CharacterListComponent } from './characters/character-list/character-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterDetailComponent,
    CharacterEditComponent,
    CharacterItemComponent,
    CharacterListComponent,
    CharactersFilterPipe,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
