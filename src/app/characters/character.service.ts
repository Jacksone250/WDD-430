import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Character } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  getCharacter(id: string){
    return this.http.get<{message: string, character: Character}>('http://localhost:3000/charaacters/' + id);
  }
}
