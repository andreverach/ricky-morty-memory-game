import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      }, 
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.GameModule)
      },
      {
        path: 'cube',
        loadChildren: () => import('./cube/cube.module').then(m => m.CubeModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule)
      },
    ]
  },  
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
