import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { AuthDataLog } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
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
        this.authStatusListener.next(true);
      });
  }
}
