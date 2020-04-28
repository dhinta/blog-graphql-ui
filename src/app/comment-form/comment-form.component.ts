import { map } from 'rxjs/internal/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  public form: FormGroup;
  public isError = false;
  private blogId: string;
  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      comment: ['', Validators.required],
    });
    this.activatedRoute.params
      .pipe(map((res) => res.id))
      .subscribe((id) => (this.blogId = id));
  }

  ngOnInit() {}

  cancel() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid && this.blogId) {
      console.log(this.form.get('comment').value, this.blogId);
      this.blogService
        .postComment(this.form.get('comment').value, this.blogId)
        .subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      // .pipe(map(res => res.createComment));
    }
  }
}
