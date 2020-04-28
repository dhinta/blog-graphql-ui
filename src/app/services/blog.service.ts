import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

import { Blog } from './../models/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private gql = {
    query: {
      getBlogs: gql`
        query {
          userBlogs {
            blogs {
              _id
              topic
              details
              date,
              comments {
                comment
                postedBy
              }
            }
            success
            errors {
              message
              type
            }
          }
        }
      `,
      getBlog: gql`
        query data($id: String!) {
          blog(id: $id) {
            blog {
              _id
              topic
              details
              date
              createdBy
              comments {
                comment
                postedBy
              }
            }
            success
            errors {
              message
              type
            }
          }
        }
      `,
    },
    mutation: {
      saveBlog: gql`
        mutation data($topic: String!, $details: String!) {
          createBlog(blog: { topic: $topic, details: $details }) {
            success
            errors {
              message
              type
            }
          }
        }
      `,
      deleteBlog: gql`
        mutation data($id: String!) {
          deleteBlog(id: $id) {
            success
            errors {
              message
              type
            }
          }
        }
      `,
      updateBlog: gql`
        mutation data($id: String!, $topic: String!, $details: String!) {
          updateBlog(id: $id, blog: { topic: $topic, details: $details }) {
            success
            errors {
              message
              type
            }
          }
        }
      `,
      saveComment: gql`
        mutation data($comment: String!, $blogId: String!) {
          createComment(comment: { comment: $comment, blogId: $blogId }) {
            success
            errors {
              message
              type
            }
          }
        }
      `,
    },
  };

  private activeBlog: Subject<Blog> = new Subject<Blog>();

  constructor(private apollo: Apollo) {}

  public deleteBlog(id: string): Observable<any> {
    // TODO: Change Type "any"
    return this.apollo
      .mutate({
        // TODO: Add a return type 'https://www.youtube.com/watch?v=Wc7bJ2uv694&t=341s'
        mutation: this.gql.mutation.deleteBlog,
        variables: {
          id,
        },
        refetchQueries: [
          {
            query: this.gql.query.getBlogs,
          },
        ],
      })
      .pipe(map((res) => res.data));
  }

  public getActiveBlog(): Observable<Blog> {
    return this.activeBlog.asObservable();
  }

  public getBlog(id: string): Observable<any> {
    // TODO: Change Type "any"
    return this.apollo
      .watchQuery({
        // TODO: Add a return type 'https://www.youtube.com/watch?v=Wc7bJ2uv694&t=341s'
        query: this.gql.query.getBlog,
        variables: {
          id,
        },
      })
      .valueChanges.pipe(map((res) => res.data));
  }

  public getBlogs(): Observable<any> {
    // TODO: Change Type "any"
    return this.apollo
      .watchQuery({
        // TODO: Add a return type 'https://www.youtube.com/watch?v=Wc7bJ2uv694&t=341s'
        query: this.gql.query.getBlogs,
      })
      .valueChanges.pipe(map((res) => res.data));
  }

  public postComment(comment: string, blogId: string): Observable<any> {
    // TODO: Change Type "any"
    return this.apollo
      .mutate({
        // TODO: Add a return type 'https://www.youtube.com/watch?v=Wc7bJ2uv694&t=341s'
        mutation: this.gql.mutation.saveComment,
        variables: {
          comment,
          blogId,
        },
        refetchQueries: [
          {
            query: this.gql.query.getBlog,
            variables: {
              id: blogId,
            },
          },
        ],
      })
      .pipe(map((res) => res.data));
  }

  public saveBlog(topic: string, details: string): Observable<any> {
    // TODO: Change Type "any"
    return this.apollo
      .mutate({
        // TODO: Add a return type 'https://www.youtube.com/watch?v=Wc7bJ2uv694&t=341s'
        mutation: this.gql.mutation.saveBlog,
        variables: {
          topic,
          details,
        },
        refetchQueries: [
          {
            query: this.gql.query.getBlogs,
          },
        ],
      })
      .pipe(map((res) => res.data));
  }

  setActiveBlog(blog: Blog) {
    this.activeBlog.next(blog);
  }

  public updateBlog(
    id: string,
    topic: string,
    details: string
  ): Observable<any> {
    // TODO: Change Type "any"
    return this.apollo
      .mutate({
        // TODO: Add a return type 'https://www.youtube.com/watch?v=Wc7bJ2uv694&t=341s'
        mutation: this.gql.mutation.updateBlog,
        variables: {
          topic,
          details,
          id,
        },
        refetchQueries: [
          {
            query: this.gql.query.getBlogs,
          },
        ],
      })
      .pipe(map((res) => res.data));
  }
}
