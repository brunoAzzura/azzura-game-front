import { AlertService } from './../../service/alert.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  // public user;
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private _auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  this._auth.logout();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loginUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this._auth.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/worldmap']);
        },
        error => {
            this._alertService.error('Votre login ou mot de passe est incorrect.');
            this.loading = false;
        });
  }
}

