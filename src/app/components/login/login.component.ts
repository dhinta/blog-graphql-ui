import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';

import { AuthenticationResponse } from 'src/app/models/user';
import { ErrorResponse } from 'src/app/models/response';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { VaidationService } from 'src/app/services/vaidation.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isError = false;
  public errors: ErrorResponse[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private vaidationService: VaidationService,
    private authService: AuthenticationService,
    private storge: StorageService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onLoginSuccess(res: AuthenticationResponse) {
    this.isError = !res.success;
    this.errors = res.errors;

    if (res.success) {
      this.storge.setLocal<string>('token', res.token);
      this.router.navigate(['/dashboard']);
    }
  }

  onLoginError(err) {
    console.log(err);
  }

  onSubmit() {
    this.vaidationService.validateOnSubmit(this.form);
    if (this.form.valid) {
      this.authService
        .login(this.form.get('email').value, this.form.get('password').value)
        .pipe(map((res) => res.authenticate))
        .subscribe({
          next: this.onLoginSuccess.bind(this),
          error: this.onLoginError.bind(this),
        });
    }
  }
}
