import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Blog';
  public isLoggedin$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {
    this.isLoggedin$ = this.authService.isLoggedin$;
  }

  ngOnInit() {}
}
