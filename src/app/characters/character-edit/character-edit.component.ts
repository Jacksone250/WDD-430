import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Character } from '../character.model';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit {
  originalCharacter: Character;
  character: Character;
  editMode: boolean = false;
  id: string;

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];

        if (!id) {
          this.editMode = false;
          return;
        }

        this.characterService.getCharacter(id).subscribe((response)=>{
          this.originalCharacter = response.character;

          if (this.originalCharacter === undefined || this.originalCharacter === null) {
            console.log('exiting ng on init');
              return;
          }
  
          this.editMode = true;
          this.character = JSON.parse(JSON.stringify(this.originalCharacter));
        });
    }); 
  }

}
