import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  onSubmit(form: FormGroup) {
    let value = form.value // get values from form’s fields
    let newCharacter = new Character(
                                  value.id, 
                                  value.characterName,
                                  value.characterDescription);
    if (this.editMode === true) {
      this.characterService.updateCharacter(this.originalCharacter, newCharacter);
    } else {
      this.characterService.addCharacter(newCharacter);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['./characters']);
  }
}
