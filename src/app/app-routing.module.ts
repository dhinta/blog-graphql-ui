import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogComponent } from './components/blog/blog.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
}, {
  path: 'registration',
  component: RegistrationComponent
}, {
  path: 'dashboard',
  component: DashboardComponent
}, {
  path: 'blogs',
  component: BlogComponent
}, {
  path: 'blog/:id',
  component: BlogPostComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
