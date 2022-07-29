import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CubeRoutingModule } from './cube-routing.module';
import { CubeComponent } from './containers/cube/cube.component';
import { CubeImagesComponent } from './components/cube-images/cube-images.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    CubeComponent,
    CubeImagesComponent
  ],
  imports: [
    CommonModule,
    CubeRoutingModule,
    SharedModule
  ]
})
export class CubeModule { }
