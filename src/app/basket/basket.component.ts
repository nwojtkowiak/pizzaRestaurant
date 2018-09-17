import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {OrderService} from "../shared/order/order.service";
import {Dish} from "../shared/models/dish";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {

  basket: Dish[] = [];
  amount = 0.0;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly orderService: OrderService, private readonly router: Router) {
  }

  ngOnInit() {
    this.basket = (JSON.parse(localStorage.getItem("basket") ? localStorage.getItem("basket") : "[]") as Dish[]);
    this.amount = (JSON.parse(localStorage.getItem("amount") ? localStorage.getItem("amount") : "0"));

    this.orderService.basket$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      dish => {
        if (dish) {
          this.basket.push(dish);
          this.amount += Number(dish.price);
          localStorage.setItem("basket", JSON.stringify(this.basket));
          localStorage.setItem("amount", JSON.stringify(this.amount));
        } else {
          this.basket = [];
          this.amount = 0;
          localStorage.setItem("basket", JSON.stringify(this.basket));
          localStorage.setItem("amount", JSON.stringify(this.amount));
        }
      }
    );
  }

  order() {
    this.router.navigate(['/summary']);
  }

  remove() {
    this.basket = [];
    this.amount = 0;
    localStorage.setItem("basket", JSON.stringify(this.basket));
    localStorage.setItem("amount", JSON.stringify(this.amount));

  }

  ngOnDestroy(): void {
    /*zabic wszystkich*/
    this.destroy$.next();
    /*zabijamy siebie*/
    this.destroy$.complete();
  }




}
