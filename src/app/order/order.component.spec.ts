import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderComponent} from './order.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {OrderService} from "../shared/order/order.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {Dish} from "../shared/models/dish";
import {Order} from "../shared/models/order";
import {SortService} from "../shared/menu/sort.service";

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let orderService: OrderService;
  let sortService: SortService;
  let router: Router;

  const orderServiceMock = {
    getOrders: jasmine.createSpy('getOrders'),
    getOrder: jasmine.createSpy('getOrder'),
    hideOrder: jasmine.createSpy('hideOrder'),
    dish$: new Subject<Dish>(),
    orders$: new Subject<Order[]>(),
    deleteOrder: jasmine.createSpy('deleteOrder'),

  };
  const sortServiceMock = {
    sortOrders: jasmine.createSpy('sortOrders'),
  };
  const routereMock = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrderComponent],
      providers: [{provide: OrderService, useValue: orderServiceMock},
        {provide: Router, useValue: routereMock},
        {provide: SortService, useValue: sortServiceMock}],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    orderService = TestBed.get(OrderService);
    sortService = TestBed.get(SortService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteOrder from orderService when delete order and navigate to orders', () => {
    // given
    const order = {id: 1, amount: 150, status: 'wait'} as Order;
    // when
    component.delete(order);
    // then
    expect(orderService.deleteOrder).toHaveBeenCalledWith(order);
    expect(router.navigate).toHaveBeenCalledWith(['/orders']);
  });

  it('should call sort from sortService when sort', () => {
    // given
    const order = {id: 1, amount: 150, status: 'wait'} as Order;
    const type = 'status';
    const direction = 'up';
    // when
    component.sort(type, direction);
    // then
    expect(sortService.sortOrders).toHaveBeenCalled();
  });

  it('should unhide detail when showDetail', () => {
    // given
    const order = {id: 1, amount: 150, status: 'wait'} as Order;
    component.detail = false;
    // when
    component.showDetail(order);
    // then
    expect( component.detail).toEqual(true);
    expect(orderService.getOrder).toHaveBeenCalledWith(order);
  });

  it('should hide detail when showDetail', () => {
    // given
    const order = {id: 1, amount: 150, status: 'wait'} as Order;
    component.detail = true;
    // when
    component.showDetail(order);
    // then
    expect( component.detail).toEqual(false);
    expect(orderService.hideOrder).toHaveBeenCalled();
  });
});
