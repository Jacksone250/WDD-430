import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Character } from '../character.model';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: Character; 
  id: string;

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        // console.log(this.id);
        // this.character = this.characterService.getCharacter(this.id).subscribe((response)=>{return response.character});
        this.characterService.getCharacter(this.id).subscribe((response)=>{
          this.character = response.character;
        });
        // console.log(this.characterService.getCharacter(this.id));
      }
    )
  }

  onDelete() {
    this.characterService.deleteCharacter(this.character);
    this.router.navigate(['characters'], {relativeTo: this.route.root});
  }

}
