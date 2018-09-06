import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {DishDetailComponent} from './dish-detail/dish-detail.component';
import {OrderComponent} from './order/order.component';

const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'menu/:id', component: DishDetailComponent},
  {path: 'order', component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
