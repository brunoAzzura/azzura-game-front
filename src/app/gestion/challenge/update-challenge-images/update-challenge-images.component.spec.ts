import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChallengeImagesComponent } from './update-challenge-images.component';

describe('UpdateChallengeImagesComponent', () => {
  let component: UpdateChallengeImagesComponent;
  let fixture: ComponentFixture<UpdateChallengeImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChallengeImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChallengeImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
