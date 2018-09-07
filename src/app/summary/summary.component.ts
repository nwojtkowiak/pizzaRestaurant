import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../shared/order.service";
import {Dish} from "../shared/dish";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(private orderService: OrderService, private  router: Router) { }
  private basket: Dish[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
  }

  submit() {
    this.basket = (JSON.parse(localStorage.getItem("basket") ? localStorage.getItem("basket") : "[]") as Dish[]);
    this.orderService.addOrder(this.basket);
    this.router.navigate(['/menu']);
  }

}
