import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../shared/models/order";
import {takeUntil} from "rxjs/operators";
import {OrderService} from "../shared/order/order.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {SortService} from "../shared/menu/sort.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  orders: Order[];
  order: Order;
  detail = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly orderService: OrderService,
              private readonly router: Router,
              private readonly sortService: SortService) {
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
    this.order = order;
    this.detail = !this.detail;
    if ( !this.detail ) {
      this.orderService.hideOrder();
    } else {
      this.orderService.getOrder(order);
    }
  }

  delete(order: Order) {
    this.orderService.deleteOrder(order);
    this.router.navigate(['/orders']);
  }

  changeStatus(order: Order) {
    const status = (document.getElementById('status' + order.id) as HTMLInputElement).value;
    order.status = status;
    this.orderService.changeStatus(order);
  }

  sort(type: string, direction: string) {
    this.sortService.sortOrders(this.orders, type, direction);
  }

  ngOnDestroy(): void {
    /*zabic wszystkich*/
    this.destroy$.next();
    /*zabijamy siebie*/
    this.destroy$.complete();
  }

}
