import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { GameComponent } from './containers/game/game.component';


@NgModule({
  declarations: [
    NavbarComponent,
    CardComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule
  ]
})
export class GameModule { }
