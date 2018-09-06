import {Component, EventEmitter, OnInit, Output, AfterViewChecked, OnDestroy} from '@angular/core';
import {Dish} from '../shared/dish';
import {MenuService} from '../shared/menu.service';
import {Subject, Subscription} from 'rxjs';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  @Output() pizza = new EventEmitter<Dish>();
  private destroy$: Subject<void> = new Subject<void>();
  dishes: Dish[];
  order: Dish[];

  constructor(public readonly menuService: MenuService,
              private readonly orderService: OrderService,
              private router: Router) {  }

  ngOnInit() {

    this.menuService.dishes$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      dishes => this.dishes = dishes
    );
    this.menuService.getDishes();
    this.order = [];
  }

  getPizza(event: Event) {
    this.menuService.dishes$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      dishes => this.dishes = dishes
    );
    this.menuService.getPizza();
  }

  getNoodles(event: Event) {
    this.menuService.dishes$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      dishes => this.dishes = dishes
    );
    this.menuService.getNoodles();
  }

  getDrinks(event: Event) {
    this.menuService.dishes$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      dishes => this.dishes = dishes
    );
    this.menuService.getDrinks();
  }

  addToBasket(event: Event) {
    const id = event.srcElement.getAttribute('id');
    this.menuService.getDish(Number(id.substr(3))).subscribe(dish => this.order.push(dish));
  }

  showDetail(dishId: number) {
    this.router.navigate(['/menu', dishId]);

  }

  addDish(event: Event) {
    const dish: Dish = {price: 50, description: 'ser, kurczak, kukurydza, ananas',
      available: true, name: 'wykoksana pizza', type: 'pizza'};
    this.menuService.addDish(dish);
  }

  ngOnDestroy(): void {
    /*zabic wszystkich*/
    this.destroy$.next();
    /*zabijamy siebie*/
    this.destroy$.complete();
  }


}
