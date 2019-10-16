import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswersUpdateComponent } from './question-answers-update.component';

describe('QuestionAnswersUpdateComponent', () => {
  let component: QuestionAnswersUpdateComponent;
  let fixture: ComponentFixture<QuestionAnswersUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAnswersUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnswersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
