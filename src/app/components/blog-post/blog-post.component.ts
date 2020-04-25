import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Blog } from 'src/app/models/blog';
import { catchError } from 'rxjs/internal/operators/catchError';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit {
  private id$: Observable<string>;
  public blog: Blog = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {
    this.id$ = this.activatedRoute.params.pipe(map((res) => res.id));
    this.id$.subscribe({
      next: this.getBlog.bind(this),
    });
  }

  ngOnInit() {}

  getBlog(id: string) {
    this.blogService
      .getBlog(id)
      .pipe(
        map((res) => res.blog),
        catchError((err) => console.log)
      )
      .subscribe(
        (res) => (this.blog = res.blog),
        (err) => console.log
      );
  }
}
