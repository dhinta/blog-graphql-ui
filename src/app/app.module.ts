import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogComponent } from './components/blog/blog.component';
import { CommentsComponent } from './components/comments/comments.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { CommentFormComponent } from './comment-form/comment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BlogComponent,
    CommentsComponent,
    RegistrationComponent,
    BlogPostComponent,
    NotFoundComponent,
    BlogFormComponent,
    BlogListComponent,
    CommentFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
