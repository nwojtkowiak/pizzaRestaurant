import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {DishDetailComponent} from './dish-detail/dish-detail.component';
import {BasketComponent} from './basket/basket.component';
import {AuthGuardService} from "./shared/login/auth-guard.service";
import {LoginComponent} from "./login/login.component";
import {SummaryComponent} from "./summary/summary.component";
import {OrderComponent} from "./order/order.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {FormDishComponent} from "./form-dish/form-dish.component";

const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'menu/:id', component: DishDetailComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent, },
  {path: 'order', component: BasketComponent},
  {path: 'orders', component: OrderComponent, canActivate: [AuthGuardService]},
  {path: 'orders/:id', component: OrderDetailComponent, canActivate: [AuthGuardService]},
  {path: 'summary', component: SummaryComponent},
  {path: 'edit', component: FormDishComponent, canActivate: [AuthGuardService]},
  {path: 'add', component: FormDishComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
