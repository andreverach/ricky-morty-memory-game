import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './containers/gallery/gallery.component';
import { DetailComponent } from './containers/detail/detail.component';


@NgModule({
  declarations: [
    GalleryComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GalleryRoutingModule,    
  ]
})
export class GalleryModule { }
