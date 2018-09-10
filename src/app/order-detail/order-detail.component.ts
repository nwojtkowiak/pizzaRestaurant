import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {OrderService} from "../shared/order/order.service";
import {Order} from "../shared/models/order";
import {Subject} from "rxjs";
import {Dish} from "../shared/models/dish";
import {Customer} from "../shared/models/customer";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  order: Order = {} as Order;
  dishes: Dish[] = [];
  customer: Customer = {} as Customer;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.order$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      order => this.order = order
    );

    this.orderService.dish$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      dish => this.dishes.push(dish)
    );

    this.orderService.customer$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      customer => this.customer = customer
    );
  }

  ngOnDestroy(): void {
    /*zabic wszystkich*/
    this.destroy$.next();
    /*zabijamy siebie*/
    this.destroy$.complete();
  }



}
