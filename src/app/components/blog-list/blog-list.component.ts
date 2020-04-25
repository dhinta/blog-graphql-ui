import { BlogService } from 'src/app/services/blog.service';
import { Component, OnInit, Input } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  @Input() blogs: Blog;
  constructor(private blogService: BlogService) {}

  ngOnInit() {}

  edit(event: MouseEvent, blog: Blog) {
    event.preventDefault();
    this.blogService.setActiveBlog(blog);
  }

  delete(event: MouseEvent, blog: Blog) {
    event.preventDefault();
    this.blogService
      .deleteBlog(blog._id)
      .pipe(map((res) => res.deleteBlog))
      .subscribe({
        next: console.log,
        error: console.log,
      });
  }
}
