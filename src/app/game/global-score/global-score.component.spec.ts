import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalScoreComponent } from './global-score.component';

describe('GlobalScoreComponent', () => {
  let component: GlobalScoreComponent;
  let fixture: ComponentFixture<GlobalScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
