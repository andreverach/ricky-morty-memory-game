import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '@core/models/character';
import { CharactersService } from '@core/services/characters.service';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit {

  characters$!: Observable<Character[]>;
  constructor(
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    const charactersIds = this.charactersService.generateIds(6);
    this.characters$ = this.charactersService.apiGetCharactersGame(charactersIds);
  }

}
