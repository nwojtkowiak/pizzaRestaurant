import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
  @Input() order: Order = {} as Order;
  @Input()show: boolean;
  dishes: Dish[] = [];
  customer: Customer = {} as Customer;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly orderService: OrderService) { }

  ngOnInit() {
    this.orderService.order$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      order => this.order = order
    );

    this.orderService.dish$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      dish => {
        if ( dish != null) {
          this.dishes.push(dish);
        } else {
          this.dishes = [];
        }}
    );

  }

  ngOnDestroy(): void {
    /*zabic wszystkich*/
    this.destroy$.next();
    /*zabijamy siebie*/
    this.destroy$.complete();
  }



}
