import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public isLoggedin$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {
    this.isLoggedin$ = this.authService.isLoggedin$;
  }

  ngOnInit() {}
}
