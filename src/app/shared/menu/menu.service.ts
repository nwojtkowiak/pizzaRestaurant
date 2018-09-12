import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Dish} from '../models/dish';
import {OrderService} from '../order/order.service';
import {LoginService} from "../login/login.service";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  dishes$ = new Subject<Dish[]>();
  dish$ = new Subject<Dish>();

  constructor(readonly  httpClient: HttpClient, private loginService: LoginService) {
  }

  getDish(id: number): Observable<Dish> {
    return this.httpClient.get<Dish>('http://localhost:3000/dishes/' + id);// .subscribe(res => this.dish$.next(res));
  }

  get(url: string) {
    const dishesObs = this.httpClient.get<Dish[]>(url);
    if (!this.loginService.checkLogin()) {
      dishesObs.pipe( map((
        dishes: Dish[]) =>
        dishes.filter(dish => dish.isAvailable))
      ).subscribe(res => this.dishes$.next(res));
    } else {
      dishesObs.subscribe(res => {
        this.dishes$.next(res);
      });
    }
  }
  getDishes() {
    this.get('http://localhost:3000/dishes');
  }

  getPizza() {
    this.get('http://localhost:3000/dishes?type=pizza');
  }

  getNoodles() {
    this.get('http://localhost:3000/dishes?type=noodle');
  }

  getDrinks() {
    this.get('http://localhost:3000/dishes?type=drink');
  }

  changeAvailability(dish: Dish) {
    dish.isAvailable = !dish.isAvailable;
    this.httpClient.put<Dish>('http://localhost:3000/dishes/' + dish.id, dish)
      .subscribe(res => this.getDishes());
  }

  addDish(dish: Dish) {
    this.httpClient.post('http://localhost:3000/dishes', dish).subscribe(
      res => this.getDishes()
    );
  }

}
