import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

export class JwtResponse {
  constructor(
    public jwttoken: string,
  ) { }
}


@Injectable({ providedIn: 'root' })
export class AuthenticationService {


  constructor(private http: HttpClient) {
  }

  login(email, password): Observable<any> {

    return this.http.post<any>('http://localhost:8090/token/login', { email, password }).pipe(map(
      userData => {
        sessionStorage.setItem('email', email);
        const tokenStr = 'Bearer ' + userData.token;
        sessionStorage.setItem('token', tokenStr);
        return userData;
      }

    ));
  }


  register(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:8090/register', user).pipe(map(
      userData => {
        sessionStorage.setItem('email', user.email);
        return userData;
      }

    ));
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('email');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('email');
  }
}
