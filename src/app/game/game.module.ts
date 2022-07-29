import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { GameComponent } from './containers/game/game.component';

@NgModule({
  declarations: [
    CardComponent,
    GameComponent,    
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,  
    SharedModule,
  ]
})
export class GameModule { }
