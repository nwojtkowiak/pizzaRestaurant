import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../shared/login/login.service";
import {Subject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  loginForm = new FormGroup(
    {
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    /*this.loginForm.setValue(['user', 'admin']);
    this.loginForm.setValue(['password', 'admin']);*/
  }

  login() {
    const user = this.loginForm.get('user').value;
    const password = this.loginForm.get('password').value;
    this.loginService.requestedPath = '/';
    this.loginService.login(user, password);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert("invalid");
    } else {
      this.login();
    }
  }

  ngOnDestroy(): void {
    /*zabic wszystkich*/
    this.destroy$.next();
    /*zabijamy siebie*/
    this.destroy$.complete();
  }

}
