import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateContainerAdminComponent } from './user-update-container-admin.component';

describe('UserUpdateContainerAdminComponent', () => {
  let component: UserUpdateContainerAdminComponent;
  let fixture: ComponentFixture<UserUpdateContainerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdateContainerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateContainerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
