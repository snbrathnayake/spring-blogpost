import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from '../../../models/login-payload';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginModel;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {

    this.loginForm = this.fb.group({
      username: '',
      password: '',

    });

    this.loginPayload = {
      username: '',
      password: '',
    };

  }

  ngOnInit() { }

  onSubmit() {

    this.loginPayload.username = this.loginForm.get('username').value;
    this.loginPayload.password = this.loginForm.get('password').value;

    this.auth.login(this.loginPayload)
      .subscribe((data: boolean) => {
        if (data) {
          console.log('REGISTER_SUCCESS ');
          this.router.navigateByUrl('/blog-hubs');
        } else {
          console.log('LOGIN_FAILED : wrong credentials');
        }
      }, error => {
        console.error('ERR_LOGIN_FAILED');
      });

  }

}
