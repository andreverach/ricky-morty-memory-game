import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './containers/detail/detail.component';
import { GalleryComponent } from './containers/gallery/gallery.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent
  },
  {
    path: 'character/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
