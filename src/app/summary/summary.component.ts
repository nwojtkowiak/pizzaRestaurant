import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../shared/order/order.service";
import {Dish} from "../shared/models/dish";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../shared/models/customer";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(private orderService: OrderService, private  router: Router) {
  }

  private basket: Dish[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  addressForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', [ Validators.required, Validators.minLength(9), Validators.pattern("[0-9]*")]),
      email: new FormControl('', [ Validators.required, Validators.email]),
    });

  ngOnInit() {
  }

  onSubmit() {
    if (this.addressForm.valid) {
      this.basket = (JSON.parse(localStorage.getItem("basket") ? localStorage.getItem("basket") : "[]") as Dish[]);
      const customer: Customer = {} as Customer;
      customer.firstName = this.addressForm.get('firstName').value;
      customer.lastName = this.addressForm.get('lastName').value;
      customer.address = this.addressForm.get('address').value;
      customer.phone = this.addressForm.get('phone').value;
      customer.email = this.addressForm.get('email').value;
      this.orderService.addOrder(this.basket, customer);
      this.router.navigate(['/menu']);
    } else {
      alert("Fields can't be empty");
    }
  }

}
