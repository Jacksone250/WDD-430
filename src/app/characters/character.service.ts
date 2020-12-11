import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Character } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characters: Character[] = [];
  private maxCharacterId: number;
  characterListChangedEvent = new Subject<Character[]>();

  constructor(private http: HttpClient) { 
    this.maxCharacterId = this.getMaxId();
  }

  sortAndSend() {
    this.characters.sort((a, b) => a.characterName > b.characterName ? 1 : b.characterName > a.characterName ? -1 : 0);
    this.characterListChangedEvent.next(this.characters.slice());
  }

  getCharacters(){
    this.http.get<{message: string, characters:Character[]}>('http://localhost:3000/characters').subscribe(
      // success method
      (response) => {
          this.characters = response.characters;
          this.maxCharacterId = this.getMaxId();
          // sort the list of characters
          this.sortAndSend();
      },
      // error method
      (error: any) => {
          // print the error to the console
          console.log(error);
      }
    );
  }

  getCharacter(id: string){
    return this.http.get<{message: string, character:Character}>('http://localhost:3000/characters/' + id);
  }

  getMaxId(): number {
    let maxId = 0;

    for( let character of this.characters) {
        let currentId = +character.id;
        if (currentId > maxId) {
            maxId = currentId;
        }
    }

    return maxId;
  }

  addCharacter(character: Character){
    if (!character) {
      return;
    }

    // make sure id of the new Character is empty
    character.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, character: Character }>('http://localhost:3000/characters',
      character,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new character to characters
          this.characters.push(responseData.character);
          this.sortAndSend();
        }
      );
  }

  updateCharacter(originalCharacter: Character, newCharacter: Character){
    if (!originalCharacter || !newCharacter) {
      return;
    }

    const pos = this.characters.findIndex(d => d.id === originalCharacter.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Character to the id of the old Character
    newCharacter.id = originalCharacter.id;
    // newCharacter._id = originalCharacter._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/characters/' + originalCharacter.id,
      newCharacter, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.characters[pos] = newCharacter;
          this.sortAndSend();
        }
      );
  }

  deleteCharacter(character: Character) {

    if (!character) {
      return;
    }

    const pos = this.characters.findIndex(d => d.id === character.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/characters/' + character.id)
      .subscribe(
        (response: Response) => {
          this.characters.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  storeCharacters() {
    this.http
      .put('https://cmsapp-aefa9.firebaseio.com/characters.json', 
      JSON.stringify(this.characters),
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      })
      .subscribe(() => {
        this.characterListChangedEvent.next(this.characters.slice());
      });
  }
}
