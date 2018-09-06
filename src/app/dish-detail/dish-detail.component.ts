import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MenuService} from "../shared/menu.service";
import {takeUntil} from "rxjs/operators";
import {Dish} from "../shared/dish";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {
  dish: Dish;
  sub: Subscription;
  constructor(private readonly route: ActivatedRoute,
              private readonly menuService: MenuService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.sub = this.menuService.getDish(+id)
      .subscribe(dish => this.dish = dish);

  }

}
