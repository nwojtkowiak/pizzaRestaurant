import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {MenuService} from "../shared/menu/menu.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Dish} from "../shared/models/dish";
import {BehaviorSubject, Subject} from "rxjs";
import {LoginService} from "../shared/login/login.service";
import {Router} from "@angular/router";
import {OrderService} from "../shared/order/order.service";
import {SortService} from "../shared/menu/sort.service";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let menuService: MenuService;
  let orderService: OrderService;
  let sortService: SortService;
  let router: Router;

  const mockedDishes: Dish[] = [{
    description: 'testowe skladniki',
    id: 1,
    isAvailable: true,
    name: 'testowe danie',
    price: 100000,
    type: 'pizza'
  }, {
    description: 'testowe skladniki',
    id: 2,
    isAvailable: false,
    name: 'testowe danie',
    price: 100000,
    type: 'pizza'
  }];

  const menuServiceMock = {
    getDishes: jasmine.createSpy('getDishes'),
    dishes$: new BehaviorSubject<Dish[]>(mockedDishes),
    getPizza: jasmine.createSpy('getPizza'),
    getDrinks: jasmine.createSpy('getDrinks'),
    getNoodles: jasmine.createSpy('getNoodles')
  };

  const orderServiceMock = {
    addToBasket: jasmine.createSpy('addToBasket'),
  };

  const sortServiceMock = {
    sortDishes: jasmine.createSpy('sortDishes'),
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
        {provide: SortService, useValue: sortServiceMock},
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
    sortService = TestBed.get(SortService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });



  it('should get dishes', () => {
    // when
    component.getDishes();
    // then
    expect(menuService.getDishes).toHaveBeenCalled();
  });

  it('should get pizza when getPizza', () => {
    // given
    const dishes = component.dishes = [];
    // when
    component.getPizza();
    // then
    expect(menuService.getDishes).toHaveBeenCalled();
    expect(component.dishes.length).toBeGreaterThan(dishes.length);
  });

  it('should get drinks when getDrink', () => {
    // given
    const dishes = component.dishes = [];
    // when
    component.getDrinks();
    // then
    expect(menuService.getDrinks).toHaveBeenCalled();
    expect(component.dishes.length).toBeGreaterThan(dishes.length);
  });

  it('should get noodles when getNoodles', () => {
    // given
    const dishes = component.dishes = [];
    // when
    component.getNoodles();
    // then
    expect(menuService.getNoodles).toHaveBeenCalled();
    expect(component.dishes.length).toBeGreaterThan(dishes.length);
  });

  it('should call menu after showDetail', () => {
    // when
    component.showDetail(1);
    // then
    expect(router.navigate).toHaveBeenCalledWith(['/menu', 1]);
  });

  it('should call addToBasket', () => {
    // give
    const dish: Dish = {} as Dish;
    // when
    component.addToBasket(dish);
    // then
    expect(orderService.addToBasket).toHaveBeenCalled();
  });

  it('should call sortDishes', () => {
    // given
    const type = 'name';
    const direction = 'up';
    // when
    component.sort(type, direction);
    // then
    expect(sortService.sortDishes).toHaveBeenCalled();
  });


});
