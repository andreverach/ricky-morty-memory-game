import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';//routerLink
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ToastComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbToastModule
  ],
  exports: [
    NavbarComponent,
    ToastComponent
  ]
})

export class SharedModule { }
