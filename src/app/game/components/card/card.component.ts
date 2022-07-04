import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/core/models/character';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  @Input() character!: Character;
  @Input() indexCharacter!: number;
  @Output() clickCharacter = new EventEmitter<any>();
  image: string = "assets/rm-bg.png";//default
  constructor() { }

  ngOnInit(): void {
  }

  checkImage(character: Character, index: number){
    console.log({character});
    this.image = character.image;
    const obj = {
      character: character,
      index: index
    };
    this.clickCharacter.emit(obj);
  }
  
}
