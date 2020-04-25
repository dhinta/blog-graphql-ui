import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { Apollo, QueryRef } from 'apollo-angular';
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
    this.user$ = new BehaviorSubject<User>(AppConstant.data.AnonymousUser);
    this.isLoggedin$ = this.user$.pipe(map((user) => !!user.email));
  }

  getUser(): Observable<User> {
    return this.user$.asObservable();
  }

  login(email, password): Observable<any> {
    // TODO: Change Type "any"
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
        // TODO: Add a return type 'https://www.youtube.com/watch?v=Wc7bJ2uv694&t=341s'
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

  getLoggedInUserInfo(): Observable<any> {
    // TODO: Change Type "any"
    const userInfoQuery = gql`
      query {
        getLoggedInUserInfo {
          user {
            email
            name
            role
          }
          success
          errors {
            message
            type
          }
        }
      }
    `;

    return this.apollo
      .watchQuery({
        // TODO: Add a return type 'https://www.youtube.com/watch?v=Wc7bJ2uv694&t=341s'
        query: userInfoQuery,
      })
      .valueChanges.pipe(
        map((res) => res.data)
      );
  }

  setUser(user: User) {
    this.user$.next(user);
  }
}
