import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLogin = false;
   login$: BehaviorSubject<boolean> = new BehaviorSubject(this.isLogin);
  requestedPath: string;

  constructor(private readonly router: Router, private readonly httpClient: HttpClient, private readonly location: Location) {
    if (sessionStorage.getItem('log')) {
      this.isLogin = true;
      this.login$.next(this.isLogin);
    }
  }

  getUser(user: string): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:3000/users?name=' + user);
  }

  login(user: string, password: string) {
    this.getUser(user).subscribe(users => {
     const user = users.pop();
      if (user.password === password) {
        this.isLogin = true;
        this.location.back();
      } else {
        this.isLogin = false;
        this.router.navigate(['/login']);
        alert('Your credentials are wrong :(');
      }
       this.login$.next(this.isLogin);
      sessionStorage.setItem('log', JSON.stringify(this.isLogin));
    });
  }

  logout() {
    this.isLogin = false;
    this.login$.next(this.isLogin);
    sessionStorage.setItem('log', JSON.stringify(this.isLogin));
  }

  checkLogin() {
    return this.isLogin;
  }
}
