import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubeImagesComponent } from './cube-images.component';

describe('CubeImagesComponent', () => {
  let component: CubeImagesComponent;
  let fixture: ComponentFixture<CubeImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CubeImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CubeImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
