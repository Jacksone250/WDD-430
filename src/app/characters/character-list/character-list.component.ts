import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from '../character.model';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  subscription: Subscription;
  term: string;

  constructor(private characterService: CharacterService) {
    this.characterService.getCharacters();
  }

  ngOnInit(): void {
    this.subscription = this.characterService.characterListChangedEvent.subscribe(
      (characters: Character[] ) => {
        this.characters = characters;
    });
  }

  search(value: string){
    this.term = value;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
