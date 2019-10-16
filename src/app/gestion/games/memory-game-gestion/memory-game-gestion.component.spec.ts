import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryGameGestionComponent } from './memory-game-gestion.component';

describe('MemoryGameGestionComponent', () => {
  let component: MemoryGameGestionComponent;
  let fixture: ComponentFixture<MemoryGameGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryGameGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryGameGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
