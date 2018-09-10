import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../shared/models/order";
import {takeUntil} from "rxjs/operators";
import {OrderService} from "../shared/order/order.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  orders: Order[];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getOrders();
    this.orderService.orders$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      orders => this.orders = orders
    );
  }

  showDetail(order: Order) {
    this.orderService.getOrder(order);
  }

  changeStatus(order: Order) {
    const status = document.getElementById('status' + order.id).value;
    order.status = status;
    this.orderService.changeStatus(order);
  }

  ngOnDestroy(): void {
    /*zabic wszystkich*/
    this.destroy$.next();
    /*zabijamy siebie*/
    this.destroy$.complete();
  }

}
