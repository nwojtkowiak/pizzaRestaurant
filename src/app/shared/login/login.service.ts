import {Injectable} from '@angular/core';
import {AuthGuardService} from "./auth-guard.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {MenuService} from "../menu/menu.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLogin = false;
  login$: Subject<boolean> = new Subject();
  requestedPath: string;
  constructor(private router: Router) {
  }

  login(user: string, password: string) {
    this.isLogin = true;
    this.login$.next(this.isLogin);
    this.router.navigate([this.requestedPath]);
    this.requestedPath = '';
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
