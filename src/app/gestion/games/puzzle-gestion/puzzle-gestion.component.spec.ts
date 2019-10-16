import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleGestionComponent } from './puzzle-gestion.component';

describe('PuzzleGestionComponent', () => {
  let component: PuzzleGestionComponent;
  let fixture: ComponentFixture<PuzzleGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
