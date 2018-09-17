import { Injectable } from '@angular/core';
import {Dish} from "../models/dish";

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  sortDishes(dishes: Dish[], type: string, direction: string) {
    if (type === 'name' && direction === 'up') {
       dishes.sort(this.sortByNameUp);
    } else if (type === 'name' && direction === 'down') {
       dishes.sort(this.sortByNameDown);
    } else if (type === 'price' && direction === 'up') {
       dishes.sort(this.sortByPriceUp);
    } else if (type === 'price' && direction === 'down') {
       dishes.sort(this.sortByPriceDown);
    }
  }

  private sortByNameUp(dish1: Dish, dish2: Dish): number {
    if (dish1.name > dish2.name) {
      return 1;
    } else if (dish1.name < dish2.name) {
      return -1;
    }
    return 0;
  }
  private sortByNameDown(dish1: Dish, dish2: Dish): number {
    if (dish1.name < dish2.name) {
      return 1;
    } else if (dish1.name > dish2.name) {
      return -1;
    }
    return 0;
  }
  private sortByPriceUp(dish1: Dish, dish2: Dish): number {
    if (Number(dish1.price) > Number(dish2.price)) {
      return 1;
    } else if (Number(dish1.price) < Number(dish2.price)) {
      return -1;
    }
    return 0;
  }
  private sortByPriceDown(dish1: Dish, dish2: Dish): number {
    if (Number(dish1.price) < Number(dish2.price)) {
      return 1;
    } else if (Number(dish1.price) > Number(dish2.price)) {
      return -1;
    }
    return 0;
  }
}
