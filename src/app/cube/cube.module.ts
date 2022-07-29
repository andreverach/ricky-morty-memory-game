import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CubeRoutingModule } from './cube-routing.module';
import { CubeComponent } from './containers/cube/cube.component';
import { CubeImagesComponent } from './components/cube-images/cube-images.component';


@NgModule({
  declarations: [
    CubeComponent,
    CubeImagesComponent
  ],
  imports: [
    CommonModule,
    CubeRoutingModule
  ]
})
export class CubeModule { }
