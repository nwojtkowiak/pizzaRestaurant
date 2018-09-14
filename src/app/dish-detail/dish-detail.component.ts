import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuService} from "../shared/menu/menu.service";
import {Dish} from "../shared/models/dish";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit, OnDestroy {
  dish: Dish;
  sub: Subscription;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly activeRoute: ActivatedRoute,
              private readonly route: Router,
              private readonly menuService: MenuService) { }

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.sub = this.menuService.getDish(+id).subscribe( dish => this.dish = dish);
  }

  changeAvailability(dish: Dish) {
    this.menuService.changeAvailability(dish);
  }

  edit(dish: Dish) {
    this.route.navigate(['edit', dish]);
  }

  delete(dish: Dish) {
    this.menuService.deleteDish(dish);
    this.route.navigate(['menu']);
  }

  ngOnDestroy(): void {
    /*zabic wszystkich*/
    this.destroy$.next();
    /*zabijamy siebie*/
    this.destroy$.complete();
  }

}
