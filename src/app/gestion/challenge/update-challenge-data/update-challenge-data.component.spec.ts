import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChallengeDataComponent } from './update-challenge-data.component';

describe('UpdateChallengeDataComponent', () => {
  let component: UpdateChallengeDataComponent;
  let fixture: ComponentFixture<UpdateChallengeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChallengeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChallengeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
