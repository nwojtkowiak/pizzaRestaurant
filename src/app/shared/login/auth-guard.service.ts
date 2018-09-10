import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "./login.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
    const isLogged = this.loginService.checkLogin();
    if (isLogged) {
      return true;
    } else {
      // todo przenieść do seta
      this.loginService.requestedPath = state.url;
      this.router.navigate(['/login/']);
      return false;
    }
  }

}
