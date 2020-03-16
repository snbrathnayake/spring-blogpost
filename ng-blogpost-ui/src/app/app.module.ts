import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { EditorModule } from '@tinymce/tinymce-angular';
// componets
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterSuccessComponent } from './components/auth/register-success/register-success.component';

// services
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { HttpClientInterceptor } from './services/http-client-interceptor.service';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { PostGuard } from './services/auth-guard/post.guard';


const routes: Routes = [
  { path: '', redirectTo: '/blog-hubs', pathMatch: 'full' },
  { path: 'blog-hubs', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-success', component: RegisterSuccessComponent },
  { path: 'new-post', component: NewPostComponent, canActivate: [PostGuard]  },
  { path: 'post/:id', component: ViewPostComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    RegisterSuccessComponent,
    HomeComponent,
    NewPostComponent,
    ViewPostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    EditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },
    AuthService,
    PostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
