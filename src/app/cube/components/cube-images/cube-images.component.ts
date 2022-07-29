import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '@core/models/character';

@Component({
  selector: 'app-cube-images',
  templateUrl: './cube-images.component.html',
  styleUrls: ['./cube-images.component.scss']
})
export class CubeImagesComponent {
  @Input() characters$!: Observable<Character[]>;  
}
