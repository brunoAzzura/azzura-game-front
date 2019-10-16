import { AlertService } from './../../../service/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  public registerForm: FormGroup;
  public loading = false;
  public submitted = false;
  // @todo : a factoriser
  public roles = [
    {value: 'ROLE_ADMIN', name: 'Administrateur'},
    {value: 'ROLE_USER', name: 'Utilisateur'}
  ];

  public formArray = new FormArray([
    new FormControl(false),
    new FormControl(true)
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        roles: this.formArray
    });
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      const userRoles = [];
      this.registerForm.value.roles.forEach( (value, index) => {
        if (value) {
          userRoles.push(this.roles[index].value);
        }
      });
      if (userRoles.length === 0) {
        userRoles.push('ROLE_USER');
      }
      this.registerForm.value.roles = userRoles;

        this.loading = true;
        this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  // this.alertService.success('Registration successful', true);
                  // put message with timeout than redirect
                  this.router.navigate(['/gestion/users']);
              },
              error => {
                  // testing with adding error in API addUser
                  // this.alertService.error(error);
                  this.loading = false;
              });
  }
}


