import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../models/register-payload';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginModel } from '../models/login-payload';
import { JwtAuthResponse } from '../models/Jwt-auth-response';
import { LocalStorage, SessionStorage, LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  register(payload: RegisterModel): Observable<RegisterModel> {
    return this.http.post<RegisterModel>(`${this.API_URL}/signup`, payload)
      .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  login(payload: LoginModel): Observable<boolean> {
    return this.http.post<JwtAuthResponse>(`${this.API_URL}/login`, payload)
      .pipe(
        map((data: JwtAuthResponse) => {
          this.storage.store('authenticationToken', data.authenticationToken);
          this.storage.store('username', data.username);
          console.log(data);
          return true;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  get isAuthentication(): boolean {
    return this.storage.retrieve('username') != null;
  }

  logout() {
    this.storage.clear('authenticationToken');
    this.storage.clear('username');
  }

  get API_URL(): string {
    return 'http://localhost:8090/api/auth';
  }

}
