import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Dish} from '../models/dish';
import {LoginService} from "../login/login.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  dishes$ = new BehaviorSubject<Dish[]>(null);

  constructor(private readonly httpClient: HttpClient, private readonly loginService: LoginService) {
  }

  getDish(id: number): Observable<Dish> {
    return this.httpClient.get<Dish>('http://localhost:3000/dishes/' + id);
  }

  get(url: string) {
    const dishesObs = this.httpClient.get<Dish[]>(url);
    if (!this.loginService.checkLogin()) {
      dishesObs.pipe( map((dishes: Dish[]) =>
        dishes.filter(dish => dish.isAvailable))
      ).subscribe(res => this.dishes$.next(res));
    } else {
      dishesObs.subscribe(res => { this.dishes$.next(res); });
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

}
