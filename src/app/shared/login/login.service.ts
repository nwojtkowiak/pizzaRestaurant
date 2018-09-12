import {Injectable} from '@angular/core';
import {AuthGuardService} from "./auth-guard.service";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {MenuService} from "../menu/menu.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Dish} from "../models/dish";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLogin = false;
  login$: Subject<boolean> = new Subject();
  requestedPath: string;
  constructor(private router: Router, private readonly httpClient: HttpClient) {
  }

  getUser(user: string): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:3000/users?name=' + user);
  }

  login(user: string, password: string) {
    this.getUser(user).subscribe(users => {
     const user = users.pop();
      if (user.password === password) {
        this.isLogin = true;
        // this.router.navigate(['/']);
      } else {
        this.isLogin = false;
        this.router.navigate(['/login']);
        alert('Your credentials are wrong :(');
      }
      this.login$.next(this.isLogin);
    });
  }

  logout() {
    this.isLogin = false;
    this.login$.next(this.isLogin);
    this.router.navigate([this.requestedPath]);
    this.requestedPath = '';
  }

  checkLogin() {
    return this.isLogin;
  }

}
