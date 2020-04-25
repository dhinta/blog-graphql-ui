import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Blog';
  public isLoggedin$: Observable<boolean>;
  public user$: Observable<User>;

  constructor(
    private authService: AuthenticationService,
    private storage: StorageService,
    private router: Router
  ) {
    this.isLoggedin$ = this.authService.isLoggedin$;
    this.user$ = this.authService.getUser();
  }

  ngOnInit() {}

  signout() {
    this.storage.removeLocal('token');
    this.router.navigate(['/']);
  }
}
