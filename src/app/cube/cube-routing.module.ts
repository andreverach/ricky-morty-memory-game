import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CubeComponent } from './containers/cube/cube.component';

const routes: Routes = [
  {
    path: '',
    component: CubeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CubeRoutingModule { }
