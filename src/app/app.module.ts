import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { BasketComponent } from './basket/basket.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormDishComponent } from './form-dish/form-dish.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BasketComponent,
    DishDetailComponent,
    LoginComponent,
    SummaryComponent,
    OrderComponent,
    OrderDetailComponent,
    FormDishComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
