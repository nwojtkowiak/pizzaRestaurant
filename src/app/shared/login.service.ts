import {Injectable} from '@angular/core';
import {AuthGuardService} from "./auth-guard.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLogin = false;
  login$: Subject<boolean> = new Subject();

  constructor(private router: Router) {
  }

  login(user: string, password: string) {
    this.isLogin = true;
    this.login$.next(this.isLogin);
    this.router.navigate(['/menu']);
  }

  checkLogin() {
    return this.isLogin;
  }

}
