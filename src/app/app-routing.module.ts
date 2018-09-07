import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {DishDetailComponent} from './dish-detail/dish-detail.component';
import {BasketComponent} from './basket/basket.component';
import {AuthGuardService} from "./shared/auth-guard.service";
import {LoginComponent} from "./login/login.component";
import {SummaryComponent} from "./summary/summary.component";

const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'menu/:id', component: DishDetailComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'order', component: BasketComponent},
  {path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
