import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
// import { parse, DocumentNode } from 'graphql';

import { User } from './../models/user';
import AppConstant from '../app.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private user$: BehaviorSubject<User>;
  public isLoggedin$: Observable<boolean>;

  constructor(private apollo: Apollo) {
    this.user$ = new BehaviorSubject<User>(AppConstant.AnonymousUser);
    this.isLoggedin$ = this.user$.pipe(map((user) => !!user.id));
  }

  getUser(): Observable<User> {
    return this.user$.asObservable();
  }

  login(email, password): Observable<any> {
    const loginMutation = gql`
      mutation data($email: String!, $password: String!) {
        authenticate(email: $email, password: $password) {
          token
          success
          errors {
            message
            type
          }
        }
      }
    `;

    return this.apollo
      .mutate({
        mutation: loginMutation,
        variables: {
          email,
          password,
        },
      })
      .pipe(
        map((res) => res.data),
        catchError((err, caught) => caught)
      );
  }

  setUser(user: User) {
    this.user$.next(user);
  }
}
