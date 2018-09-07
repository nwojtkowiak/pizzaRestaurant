import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Dish} from './dish';
import {OrderService} from './order.service';
import {Order} from './order';
import {AuthGuardService} from "./auth-guard.service";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  dishes$ = new Subject<Dish[]>();

  constructor( readonly  httpClient: HttpClient, private orderService: OrderService, private auth: AuthGuardService) { }

  getDish(id: number): Observable<Dish> {
    return this.httpClient.get<Dish>('http://localhost:3000/dishes/' + id);
  }

  getDishes(available: boolean) {
    if (available) {
      this.httpClient.get<Dish[]>('http://localhost:3000/dishes?isAvailable=true')
        .subscribe(dishes => this.dishes$.next(dishes));
    } else {
      this.httpClient.get<Dish[]>('http://localhost:3000/dishes')
        .subscribe(dishes => this.dishes$.next(dishes));
    }
  }

  getPizza(available: boolean) {
    if (available) {
      this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=pizza&&isAvailable=true')
        .subscribe(dishes => this.dishes$.next(dishes));
    } else {
      this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=pizza')
        .subscribe(dishes => this.dishes$.next(dishes));
    }
  }

  getNoodles(available: boolean) {
    if (available) {
      this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=noodle&&isAvailable=true')
        .subscribe(dishes => this.dishes$.next(dishes));
    } else {
      this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=noodle')
        .subscribe(dishes => this.dishes$.next(dishes));
    }
  }

  getDrinks(available: boolean) {
    if (available) {
      this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=drink&&isAvailable=true')
        .subscribe(dishes => this.dishes$.next(dishes));
    } else {
      this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=drink')
        .subscribe(dishes => this.dishes$.next(dishes));
    }
  }

  changeAvailability(dish: Dish) {
    dish.isAvailable = !dish.isAvailable;
    this.httpClient.put<Dish>('http://localhost:3000/dishes/' + dish.id, dish)
      .subscribe(res => this.getDishes(false));
  }

  addDish(dish: Dish) {
    this.httpClient.post('http://localhost:3000/dishes', dish).subscribe(
      res => this.getDishes(true)
    );
  }

}
