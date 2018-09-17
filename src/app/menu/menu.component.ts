import {Component, EventEmitter, OnInit, Output, AfterViewChecked, OnDestroy} from '@angular/core';
import {Dish} from '../shared/models/dish';
import {MenuService} from '../shared/menu/menu.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {map, takeUntil, tap} from 'rxjs/operators';
import {OrderService} from "../shared/order/order.service";
import {LoginService} from "../shared/login/login.service";
import {SortService} from "../shared/menu/sort.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  @Output() pizza = new EventEmitter<Dish>();
  private destroy$: Subject<void> = new Subject<void>();
  dishes: Dish[] = [];
  order: Dish[] = [];
  login = false;

  constructor(public readonly menuService: MenuService,
              private readonly orderService: OrderService,
              private readonly loginService: LoginService,
              private readonly router: Router,
              private readonly sortService: SortService) {  }

  ngOnInit() {

    this.menuService.dishes$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      dishes => this.dishes = dishes
    );

    this.loginService.login$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      login => this.login = login
    );

    this.order = [];
    this.login = this.loginService.checkLogin();
    this.menuService.getDishes();
  }

  getPizza() {
    this.menuService.dishes$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      dishes => this.dishes = dishes
    );
    this.menuService.getPizza();

  }

  getNoodles() {
    this.menuService.dishes$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      dishes => this.dishes = dishes
    );
    this.menuService.getNoodles();
  }

  getDrinks() {
    this.menuService.dishes$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      dishes => this.dishes = dishes
    );
    this.menuService.getDrinks();
  }

  addToBasket(dish: Dish) {
    this.orderService.addToBasket(dish);
  }

  showDetail(dishId: number) {
    this.router.navigate(['/menu', dishId]);
  }

  getDishes() {
    this.menuService.getDishes();
  }

  sort(type: string, direction: string) {
    this.sortService.sortDishes(this.dishes, type, direction);
  }

  ngOnDestroy(): void {
    /*zabic wszystkich*/
    this.destroy$.next();
    /*zabijamy siebie*/
    this.destroy$.complete();
  }





}
