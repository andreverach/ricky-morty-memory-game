import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/core/models/character';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']  
})
export class CardComponent {

  @Input() character!: Character;
  @Input() indexCharacter!: number;
  @Output() clickCharacter = new EventEmitter<any>();
  image: string = "assets/rm-bg.png";//default background image
  matched: boolean = false;//default false
  constructor() { }

  checkImage(character: Character, index: number){
    this.image = character.image;
    const obj = {
      character: character,
      index: index,
      matched: this.matched
    };
    this.clickCharacter.emit(obj);
  }
  
}
