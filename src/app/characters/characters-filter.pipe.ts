import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../characters/character.model';

@Pipe({
  name: 'charactersFilter'
})
export class CharactersFilterPipe implements PipeTransform {

  transform(characters: Character[], term) { 
    let filteredCharacters: Character[] =[];  
    if (term && term.length > 0) {
      filteredCharacters = characters.filter(
          (character:Character) => character.characterName.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (filteredCharacters.length < 1){
      return characters;
    }
    return filteredCharacters;
  }

}
