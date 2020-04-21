import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { map } from 'rxjs/internal/operators/map';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public form: FormGroup;
  public createTopic: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      topic: ['', Validators.required],
      details: ['', Validators.required],
    });
    this.createTopic = false;
  }

  ngOnInit() {
    this.authService
      .getLoggedInUserInfo()
      .pipe(map((res) => res.getLoggedInUserInfo))
      .subscribe(
        (res) => this.authService.setUser(res.user),
        (err) => console.log(err)
      );
  }

  onSubmit() {
    console.log(this.form.valid);
  }

  newTopic(createTopic: boolean) {
    this.createTopic = createTopic;
    this.form.reset();
  }
}
