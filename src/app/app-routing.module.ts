import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogComponent } from './components/blog/blog.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticationGuardService } from './services/guards/authentication-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'blogs',
    component: BlogComponent,
  },
  {
    path: 'blog/:id',
    component: BlogPostComponent,
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
