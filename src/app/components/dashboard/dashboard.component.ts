import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public form: FormGroup;
  public createTopic: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      topic: ['', Validators.required],
      details: ['', Validators.required]
    });
    this.createTopic = false;
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form.valid);
  }

  newTopic(createTopic: boolean) {
    this.createTopic = createTopic;
    this.form.reset();
  }

}
