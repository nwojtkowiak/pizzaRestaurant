import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../shared/login/login.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login(event: Event) {
   // const user = event.srcElement.getAttribute('user').valueOf();
    /*const password = event.srcElement.getAttribute('password').valueOf();*/
    this.loginService.requestedPath = '/';
    this.loginService.login('', '');
  }

  ngOnDestroy(): void {
    /*zabic wszystkich*/
    this.destroy$.next();
    /*zabijamy siebie*/
    this.destroy$.complete();
  }

}
