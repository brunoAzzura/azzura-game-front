import { UserService } from './../../../service/user.service';
import { PasswordValidator } from './../../../validators/password-validator';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-update-password',
  templateUrl: './user-update-password.component.html',
  styleUrls: ['./user-update-password.component.scss']
})
export class UserUpdatePasswordComponent implements OnInit {

  @Input() userId;
  public passwordForm: FormGroup;
  public loading = false;
  public submitted = false;
  public matching_passwords_group;
  public showMessage = false;

  // account_validation_messages = {
  //   'confirm_password': [
  //     { type: 'required', message: 'Confirm password is required' },
  //     { type: 'areEqual', message: 'Password mismatch' }
  //   ],
  //   'password': [
  //     { type: 'required', message: 'Password is required' },
  //     { type: 'minlength', message: 'Password must be at least 5 characters long' },
  //     { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
  //   ]
  //   };

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
         Validators.minLength(6),
         Validators.required
        //  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)

    }, (formGroup: FormGroup) => {
       return PasswordValidator.areEqual(formGroup);
    });

    this.passwordForm = this.formBuilder.group({
      matching_passwords: this.matching_passwords_group
    });
  }

  get f() { return this.passwordForm.get('matching_passwords'); }

  updateUserPassword() {
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return;
    }
    this.loading = true;

    const data = {'password': this.passwordForm.get('matching_passwords').get('password').value };
    this._userService.patchUser(data, this.userId)
      .subscribe(
          res => {
              this.showMessage = true;
              this.submitted = false;
              this.passwordForm.reset();
              setTimeout(() => {
                this.showMessage = false;
              }, 5000);
          },
          error => {
              // this.alertService.error(error);
              this.loading = false;
          });

  }

}
