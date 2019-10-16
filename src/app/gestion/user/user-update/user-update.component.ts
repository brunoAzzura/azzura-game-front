import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from './../../../service/user.service';
import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  @Input() user;
  @Input() rightManagment;
  @Output() userUpdated: EventEmitter<any> = new EventEmitter();
  public userForm: FormGroup;
  public loading = false;
  public submitted = false;
  public roles = [
    {value: 'ROLE_ADMIN', name: 'Administrateur'},
    {value: 'ROLE_USER', name: 'Utilisateur'}
  ];
  public showMessage = false;

  public formArray = new FormArray([
    new FormControl(),
    new FormControl()
  ]);

  constructor(
    private _userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
    if (this.rightManagment) {
      this.userForm.addControl('roles', this.formArray);
    }
    if (this.rightManagment) {
      const rolesValue = [];
      this.roles.forEach( (role, index) => {
        if (this.user.roles.find(userRole => userRole === role.value)) {
          rolesValue.push(true);
        } else {
          rolesValue.push(false);
        }
      });
        this.userForm.patchValue({
          roles: rolesValue
      });
      }
      this.userForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          username: this.user.username
      });
  }

  updateUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    if (this.rightManagment) {
      const userRoles = [];
      this.userForm.value.roles.forEach( (value, index) => {
        if (value) {
          userRoles.push(this.roles[index].value);
        }
      });
      if (userRoles.length === 0) {
        userRoles.push('ROLE_USER');
      }
      this.userForm.value.roles = userRoles;
    }

    this.loading = true;
    this._userService.patchUser(this.userForm.value, this.user.id)
        .subscribe(
            data => {
                this.loading = false;
                this.showMessage = true;
                setTimeout(() => {
                  this.userUpdated.emit(data);
                  this.showMessage = false;
                }, 5000);
            },
            error => {
                // this.alertService.error(error);
                this.loading = false;
            });
  }
}
