import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Dish} from '../models/dish';
import {HttpClient} from "@angular/common/http";
import {Order} from "../models/order";
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

  constructor(private readonly httpClient: HttpClient,
              private readonly menuService: MenuService) {
  }

  addToBasket(dish) {
    this.basket$.next(dish);
  }

  addOrder(basket: Dish[], customer: Customer) {
    const order: Order = {} as Order;
    order.dishIds = [];
    order.status = 'new';
    order.customer = customer;

    basket.map(b => b.id).forEach(element => order.dishIds.push(element));

    this.httpClient.post<Order>('http://localhost:3000/orders', order).subscribe(
      res => console.log(res.id) );
    localStorage.setItem('basket', JSON.stringify([]));
  }

  getOrder(order: Order) {
    order.dishIds.forEach( dishId => this.menuService.getDish(dishId).subscribe(res => this.dish$.next(res)));
  }
  hideOrder() {
    this.dish$.next(null);
  }

  getOrders() {
    let orders: Order[] = [];
    this.httpClient.get<Order[]>('http://localhost:3000/orders').
    subscribe(res => { orders = res; this.orders$.next(res);  } );

  }

  changeStatus(order: Order) {
    this.httpClient.put<Order>('http://localhost:3000/orders/' + order.id, order).subscribe(
      res => this.getOrders() );
  }
}
