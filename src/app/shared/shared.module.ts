import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';//routerLink
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ToastComponent,
    ProgressBarComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbToastModule,
  ],
  exports: [
    NavbarComponent,
    ToastComponent,
    ProgressBarComponent,
    SpinnerComponent,
  ]
})

export class SharedModule { }
