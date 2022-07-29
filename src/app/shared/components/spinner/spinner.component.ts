import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  //en este caso usar cada loader en componentes diferentes porque ambos se estarian mostrando :D
  isLoading: boolean = false;
  constructor(
    private loadingService: LoadingService,
  ) { 
    this.loadingService.isSpinnerLoading
    .subscribe(loader => {
      this.isLoading = loader;
      console.log(loader);
    });
  }

}
