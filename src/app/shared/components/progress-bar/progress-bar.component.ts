import { Component } from '@angular/core';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent{  

  isLoading: boolean = false;
  constructor(
    private loadingService: LoadingService,
  ){
    this.loadingService.isProgressLoading$
    .subscribe(loader => {
      this.isLoading = loader;
    });
   }  
}
