import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsListUpdateComponent } from './questions-list-update.component';

describe('QuestionsListUpdateComponent', () => {
  let component: QuestionsListUpdateComponent;
  let fixture: ComponentFixture<QuestionsListUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsListUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsListUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
