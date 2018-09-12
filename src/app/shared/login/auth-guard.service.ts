import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "./login.service";
import {st} from "@angular/core/src/render3";


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
    const isLogged = this.loginService.checkLogin();

    if (isLogged) {
      this.router.navigate(['/menu']);
       return true;
    } else {
      // todo przenieść do seta
      this.router.navigate(['/login/']);
       return false;
    }
  }

}
