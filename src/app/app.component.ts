import {Component, OnInit} from '@angular/core';
import {MenuService} from './shared/menu/menu.service';
import {Router} from '@angular/router';
import {LoginService} from "./shared/login/login.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {OrderService} from "./shared/order/order.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pizzeria Hakuna Matata';
  isLogin = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor( private router: Router, private loginService: LoginService,
               private menuService: MenuService, private orderService: OrderService) {
    /*setTimeout(() => {
      this.show = true;
    }, 10000);*/

  }
  ngOnInit() {
    this.loginService.login$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => this.isLogin = res);
  }


  navigateToMenu() {
    this.menuService.getDishes();
    this.router.navigate(['/menu']);
  }

  navigateToOrder() {
    this.orderService.getOrders();
    this.router.navigate(['/orders']);
  }

  login() {
    this.loginService.requestedPath = this.router.url;
    this.router.navigate(['/login']);
  }

  logout() {
    this.loginService.requestedPath = this.router.url;
    this.loginService.logout();
    this.isLogin = this.loginService.checkLogin();
  }
}
