import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CharacterInfo } from '@core/models/character';
import { Paginate } from '@core/models/paginate';
import { CharactersService } from '@core/services/characters.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  characters: CharacterInfo[] = [];
  page: number = 1;
  loadingCharacters: boolean = false;
  loadingMore: boolean = false;
  paginateInfo: Paginate = {
    count: 0,
    next: '',
    pages: 0,
    prev: '',
  };
  constructor(
    private charactersService:CharactersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(){
    this.loadingCharacters = true;
    this.charactersService.apiGetCharactersPaginate(this.page)
    .subscribe((response: any) => {
      this.paginateInfo = response.info;
      const mapCharacters = response.results.map((character: CharacterInfo) => {
        return this.assignClassToCharacter(character);
      });
      this.characters = this.characters.concat(mapCharacters);
      this.loadingCharacters = false;
      this.loadingMore = false;      
    });
  }

  goToCharacterDetail(id: string){//
    this.router.navigate(['/gallery/character', id]);
  }

  loadMore(){
    this.page++;
    this.loadingMore = true;
    this.getCharacters();
  }

  trackByFn(index: any, character: CharacterInfo){//
    //console.log({index});
    return character.id;
  }

  assignClassToCharacter(character: CharacterInfo): CharacterInfo{
    //numero random del 1 al 4, pero le doy hasta 8 para tener 1 posibilidad más en el tall wide y 2 mas en normal
    //de manera que big tenga la menor posibilidad :D
    const randomClass = Math.floor((Math.random() * (8 - 1 + 1)) + 1);
    switch(randomClass){
      case 2:
      case 5:
        character.className = 'tall';
        break;
      case 6:
      case 8:
        character.className = 'wide';            
        break;
      case 1:
        character.className = 'big';            
        break;
      default://3 y 4 y 7 sera sin clase osea tamaño normal
        character.className = '';
        break;
    }
    //console.log(randomClass, character.className);
    return character;
  }

  goToTop(){
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  }

}
