import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BasketComponent} from './basket.component';
import {OrderService} from "../shared/order/order.service";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {Subject} from "rxjs";
import {Dish} from "../shared/models/dish";

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let orderService: OrderService;
  let router: Router;
  const orderServiceMock = {
    addToBasket: jasmine.createSpy('addToBasket'),
    basket$: new Subject<Dish>()
  };
  const routereMock = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketComponent ],
      providers: [{provide: OrderService, useValue: orderServiceMock},
        {provide: Router, useValue: routereMock}],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    orderService = TestBed.get(OrderService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to summary when order', () => {
    // when
    component.order();
    // then
    expect(router.navigate).toHaveBeenCalledWith(['/summary']);
  });

  it('should remove items from basket when remove', () => {
    // when
    component.remove();
    // then
    expect(component.basket).toEqual([]);
    expect(component.amount).toEqual(0);
  });
});
