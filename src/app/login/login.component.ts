import { Component, OnInit } from '@angular/core';
import {LoginService} from "../shared/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login(event: Event) {
   // const user = event.srcElement.getAttribute('user').valueOf();
    //const password = event.srcElement.getAttribute('password').valueOf();
    this.loginService.login('', '');
  }

}
