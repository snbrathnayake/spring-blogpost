import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterModel } from '../../../models/register-payload';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterModel;

  constructor(private fb: FormBuilder, private auth: AuthService , private router: Router ) {

    this.registerForm = this.fb.group({
      username: '',
      email: '',
      password: '',
      confirmpassword: ''
    });

    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
    };

  }

  ngOnInit() { }

  onSubmit() {

    this.registerPayload.username = this.registerForm.get('username').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.password = this.registerForm.get('password').value;
    this.registerPayload.confirmpassword = this.registerForm.get('confirmpassword').value;

    this.auth.register(this.registerPayload)
      .subscribe((data: any) => {
        console.log('REGISTER_SUCCESS ');
        this.router.navigateByUrl('/register-success');
      }, error => {
        console.error('ERR_REGISTER_FAILED');
      });

  }

}
