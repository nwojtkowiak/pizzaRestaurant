import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Dish} from './dish';
import {HttpClient} from "@angular/common/http";
import {Order} from "./order";
import {forEach} from "@angular/router/src/utils/collection";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  basket$ = new Subject<Dish>();
  /*order$ = new Subject<Order>();*/

  constructor(private readonly httpClient: HttpClient, private router: Router) {
  }

  addToBasket(dish) {
    this.basket$.next(dish);
  }
  addOrder(basket: Dish[]) {
    let order: Order = {} as Order;
    order.dishIds = [];
    basket.map(b => b.id).forEach(element => order.dishIds.push(element));

    /*order.dishIds.every(()=> basket.every(()=> ))*/
    this.httpClient.post<Order>('http://localhost:3000/orders', order).subscribe(
      res => console.log(res.id) );
    localStorage.setItem('basket', JSON.stringify([]));
  }
  confirmOrder() {
    this.router.navigate(['/summary']);
  }

  /*updateBasket(order: Order, orderId: number) {
    this.httpClient.put<Order>('http://localhost:3000/orders/' + orderId, order).subscribe(
      res  => this.order$.next(res));
    return orderId;
  }*/

  getOrder(id: number): Order {
    let order: Order;
    this.httpClient.get<Order>('http://localhost:3000/basket/' + id).subscribe(res => order = res);
    return order;
  }
}
