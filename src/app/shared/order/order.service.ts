import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Dish} from '../models/dish';
import {HttpClient} from "@angular/common/http";
import {Order} from "../models/order";
import {forEach} from "@angular/router/src/utils/collection";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {MenuService} from "../menu/menu.service";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  basket$ = new Subject<Dish>();
  orders$ = new Subject<Order[]>();
  dish$ = new Subject<Dish>();
  order$ = new Subject<Order>();
  customer$ = new Subject<Customer>();

  constructor(private readonly httpClient: HttpClient, private router: Router,
              private menuService: MenuService) {
  }

  addToBasket(dish) {
    this.basket$.next(dish);
  }
  addOrder(basket: Dish[]) {
    const order: Order = {} as Order;
    order.dishIds = [];
    order.status = 'new';
    basket.map(b => b.id).forEach(element => order.dishIds.push(element));

    this.httpClient.post<Order>('http://localhost:3000/orders', order).subscribe(
      res => console.log(res.id) );
    localStorage.setItem('basket', JSON.stringify([]));
  }
  confirmOrder() {
    this.router.navigate(['/summary']);
  }

  getOrder(order: Order) {
    /*this.httpClient.get<Order>('http://localhost:3000/orders/' + id).subscribe(res => this.order$.next(res));*/
    order.dishIds.forEach( dishId => this.menuService.getDish(dishId).subscribe(dish => this.dish$.next(dish)));
    this.router.navigate(['orders/', order.id]);
    this.customer$.next(order.customer);

  }

  getOrders() {
    let orders: Order[] = [];
    const ordersObs = this.httpClient.get<Order[]>('http://localhost:3000/orders').
    subscribe(res => { orders = res; this.orders$.next(res);  } );

  }

  changeStatus(order: Order) {
    this.httpClient.put<Order>('http://localhost:3000/orders/' + order.id, order).subscribe(
      res => this.getOrders() );
  }
}
