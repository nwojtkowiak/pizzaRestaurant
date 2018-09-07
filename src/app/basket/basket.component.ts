import {Component, Input, OnInit, OnChanges, OnDestroy} from '@angular/core';
import {MenuService} from '../shared/menu.service';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {OrderService} from "../shared/order.service";
import {Dish} from "../shared/dish";
import {angularCoreEnv} from "@angular/core/src/render3/jit/environment";

@Component({
  selector: 'app-order',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {

  basket: Dish[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private orderService: OrderService, private menuService: MenuService) {
  }

  ngOnInit() {
    this.basket = (JSON.parse(localStorage.getItem("basket") ? localStorage.getItem("basket") : "[]") as Dish[]);
    this.orderService.basket$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      dish => {
        if (dish) {
          this.basket.push(dish);
          localStorage.setItem("basket", JSON.stringify(this.basket));
        } else {
          this.basket = [];
          localStorage.setItem("basket", JSON.stringify(this.basket));
        }
      }
    );
  }


  ngOnDestroy(): void {
    /*zabic wszystkich*/
    this.destroy$.next();
    /*zabijamy siebie*/
    this.destroy$.complete();
  }

  order() {
    this.orderService.confirmOrder();
  }


}
