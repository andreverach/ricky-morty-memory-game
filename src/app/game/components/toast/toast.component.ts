import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  
})
export class ToastComponent implements OnInit {

  constructor(
    public toastService:ToastService
  ) { }

  ngOnInit(): void {
    console.log('toast component inicio');
  }
  
  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }

}
