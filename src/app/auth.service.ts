import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { AuthDataLog } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(
    userid: string,
    email: string,
    password: string,
    city: string,
    street: string,
    name: string,
    lastname: string
  ) {
    const authData: AuthData = {
      userid: userid,
      email: email,
      password: password,
      city: city,
      street: street,
      name: name,
      lastname: lastname
    };
    return this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }
  login(email: string, password: string) {
    const authDataLog: AuthDataLog = {
      email: email,
      password: password
    };
    this.http.post<{token: string}>("http://localhost:3000/api/user/login", authDataLog)
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        this.token = token;
        if (token) {
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime());
        this.saveAuthData(token, expirationDate);
        this.router.navigate(['/shopping']);
      }
    });
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData(token: string, expirationDate: Date) {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  // private getAuthData() {
  //   const token = localStorage.getItem('token');
  //   const expirationDate = localStorage.getItem('expiration');
  //   if (!token || !expirationDate) {
  //     return;
  //   }
  //   return {
  //     token: token,
  //     expirationDate: new Date(expirationDate)
  //   };
  // }
}

