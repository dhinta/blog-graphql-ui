import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { map } from 'rxjs/internal/operators/map';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from 'src/app/models/blog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public blogs: Blog[] = [];

  constructor(
    private authService: AuthenticationService,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    // Get Loggedin User information
    this.getLoggedInUserInfo();
    this.getBlogs();
  }

  getBlogs() {
    this.blogService
      .getBlogs()
      .pipe(map((res) => res.userBlogs))
      .subscribe(
        (res) => {
          this.blogs = res.blogs;
        },
        (err) => console.log(err)
      );
  }

  getLoggedInUserInfo() {
    this.authService
      .getLoggedInUserInfo()
      .pipe(map((res) => res.getLoggedInUserInfo))
      .subscribe(
        (res) => this.authService.setUser(res.user),
        (err) => console.log(err)
      );
  }

  onSave(event) {
    this.getBlogs();
  }
}
