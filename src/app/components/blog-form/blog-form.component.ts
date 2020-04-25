import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { HttpResponse } from 'src/app/models/response';
import { map } from 'rxjs/internal/operators/map';
import { Blog } from 'src/app/models/blog';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
})
export class BlogFormComponent implements OnInit {
  public createTopic = false;
  public form: FormGroup;
  public isError = false;
  public activeBLog: Blog = null;

  @Output() saved: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService
  ) {
    this.form = this.formBuilder.group({
      topic: ['', Validators.required],
      details: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.blogService.getActiveBlog().subscribe(this.setFormData.bind(this));
  }

  emptyBlog() {
    this.activeBLog = null;
    this.blogService.setActiveBlog(null);
  }

  newTopic(createTopic: boolean) {
    this.emptyBlog();
    this.createTopic = createTopic;
    this.form.reset();
  }

  onBlogSubmit(res: HttpResponse) {
    if (res.success) {
      this.emptyBlog();
      this.saved.emit(true);
      this.form.reset();
    } else {
      this.isError = true;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.activeBLog ? this.updateBlog() : this.saveBlog();
    }
  }

  saveBlog() {
    this.blogService
      .saveBlog(this.form.get('topic').value, this.form.get('details').value)
      .pipe(map((res) => res.createBlog))
      .subscribe({
        next: this.onBlogSubmit.bind(this),
        error: console.log,
      });
  }

  updateBlog() {
    this.blogService
      .updateBlog(this.activeBLog._id, this.form.get('topic').value, this.form.get('details').value)
      .pipe(map((res) => res.updateBlog))
      .subscribe({
        next: this.onBlogSubmit.bind(this),
        error: console.log,
      });
  }

  setFormData(blog: Blog) {
    if (!blog) {
      return;
    }
    this.newTopic(true);
    setTimeout(() => {
      this.activeBLog = blog;
      this.form.patchValue({
        topic: this.activeBLog.topic,
        details: this.activeBLog.details,
      });
    });
  }
}
