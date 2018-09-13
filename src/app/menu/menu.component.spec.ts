import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {MenuService} from "../shared/menu/menu.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Dish} from "../shared/models/dish";
import {Subject} from "rxjs";
import {LoginService} from "../shared/login/login.service";
import {Router} from "@angular/router";
import {OrderService} from "../shared/order/order.service";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let menuService: MenuService;
  let orderService: OrderService;
  let router: Router;

  const menuServiceMock = {
    getDishes: jasmine.createSpy('getDishes'),
    dishes$: new Subject<Dish[]>(),
  };

  const orderServiceMock = {
    addToBasket: jasmine.createSpy('addToBasket'),
  };

  const loginServiceMock = {
    login$: new Subject<boolean>(),
    checkLogin: jasmine.createSpy('checkLogin')
  };

  const routereMock = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ MenuComponent ],
      providers: [{provide: MenuService, useValue: menuServiceMock},
        {provide: OrderService, useValue: orderServiceMock},
        {provide: LoginService, useValue: loginServiceMock},
        {provide: Router, useValue: routereMock}
      ],

      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    menuService = TestBed.get(MenuService);
    orderService = TestBed.get(OrderService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should get dishes', () => {
    // when
    component.getDishes();
    // then
    expect(menuService.getDishes).toHaveBeenCalled();
  });


  it('should call menu after showDetail', () => {
    // when
    component.showDetail(1);
    // then
    expect(router.navigate).toHaveBeenCalledWith(['/menu', 1]);
  });

  it('should call addToBasket', () => {
    // give
    let dish: Dish;
    // when
    component.addToBasket(dish);
    // then
    expect(orderService.addToBasket).toHaveBeenCalled();
  });

});
