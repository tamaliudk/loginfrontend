import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue() {
    return this.currentUserSubject.value;
  }


  login(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:8080/login', user);
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:8080/login', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
