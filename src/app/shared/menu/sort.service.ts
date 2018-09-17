import {Injectable} from '@angular/core';
import {Dish} from "../models/dish";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() {
  }

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

  sortOrders(orders: Order[], type: string, direction: string) {
    if (type === 'status' && direction === 'up') {
      orders.sort(this.sortByStatusUp);
    } else if (type === 'status' && direction === 'down') {
      orders.sort(this.sortByStatusDown);
    } else if (type === 'price' && direction === 'up') {
      orders.sort(this.sortByAmountUp);
    } else if (type === 'price' && direction === 'down') {
      orders.sort(this.sortByAmountDown);
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

  private sortByStatusDown(order1: Order, order2: Order): number {
    if (order1.status < order2.status) {
      return 1;
    } else if (order1.status > order2.status) {
      return -1;
    }
    return 0;
  }

  private sortByStatusUp(order1: Order, order2: Order): number {
      if (order1.status > order2.status) {
        return 1;
      } else if (order1.status < order2.status) {
        return -1;
      }
    return 0;
  }

  private sortByAmountUp(order1: Order, order2: Order): number {
    if (Number(order1.amount) > Number(order2.amount)) {
      return 1;
    } else if (Number(order1.amount) < Number(order2.amount)) {
      return -1;
    }
    return 0;
  }

  private sortByAmountDown(order1: Order, order2: Order): number {
    if (Number(order1.amount) < Number(order2.amount)) {
      return 1;
    } else if (Number(order1.amount) > Number(order2.amount)) {
      return -1;
    }
    return 0;
  }
}
