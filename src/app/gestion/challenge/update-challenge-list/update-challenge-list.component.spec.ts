import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChallengeListComponent } from './update-challenge-list.component';

describe('UpdateChallengeListComponent', () => {
  let component: UpdateChallengeListComponent;
  let fixture: ComponentFixture<UpdateChallengeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChallengeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChallengeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
