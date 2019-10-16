import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionImageUpdateComponent } from './question-image-update.component';

describe('QuestionImageUpdateComponent', () => {
  let component: QuestionImageUpdateComponent;
  let fixture: ComponentFixture<QuestionImageUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionImageUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionImageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
