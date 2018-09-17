import {TestBed, inject, fakeAsync} from '@angular/core/testing';

import { MenuService } from './menu.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpHandler} from "@angular/common/http";
import {Dish} from "../models/dish";
import {BehaviorSubject, Subject} from "rxjs";
import {LoginService} from "../login/login.service";

describe('MenuService', () => {
  let menuService: MenuService;
  let loginService: LoginService;

  const mockedDish: Dish = {
    description: 'testowe skladniki',
    id: 1,
    isAvailable: true,
    name: 'testowe danie',
    price: 100000,
    type: 'pizza'
  };
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
  }, {
    description: 'testowe skladniki',
    id: 3,
    isAvailable: true,
    name: 'testowe danie',
    price: 100000,
    type: 'noodle'
  }, {
    description: 'testowe skladniki',
    id: 4,
    isAvailable: false,
    name: 'testowe danie',
    price: 100000,
    type: 'noodle'
  }, {
    description: 'testowe skladniki',
    id: 5,
    isAvailable: true,
    name: 'testowe danie',
    price: 100000,
    type: 'drink'
  }, {
    description: 'testowe skladniki',
    id: 6,
    isAvailable: false,
    name: 'testowe danie',
    price: 100000,
    type: 'drink'
  }];
  let mockBackend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService,  LoginService],
      imports: [ HttpClientTestingModule, RouterTestingModule]
    });
    menuService = TestBed.get(MenuService);
    loginService = TestBed.get(LoginService);
    mockBackend = TestBed.get(HttpTestingController);
  });

  it('should create service', () => {
    // then
    expect(menuService).toBeTruthy();
  });

  it('should load a dish when getDish', fakeAsync(() => {
    // given

    let dish: Dish;
    spyOn(loginService, "checkLogin").and.returnValue(true);
    // when
    menuService.getDish(mockedDish.id).subscribe(res => dish = res);
    mockBackend.expectOne('http://localhost:3000/dishes/' + mockedDish.id).flush(mockedDish);

    // then
    expect(dish).toEqual(mockedDish);
  }));

  it('should load available dishes when getDishes', fakeAsync(() => {
    // given
    let dishes: Dish[];
    spyOn(loginService, "checkLogin").and.returnValue(false);

    // when
    menuService.dishes$.subscribe(res => dishes = res);
    menuService.getDishes();
    mockBackend.expectOne('http://localhost:3000/dishes').flush(mockedDishes);

    // then
    expect(dishes.length).toEqual(3);
    expect(loginService.checkLogin).toHaveBeenCalled();
  }));

  it('should load all dishes when getDishes', fakeAsync(() => {
    // given
    let dishes: Dish[];
    spyOn(loginService, "checkLogin").and.returnValue(true);

    // when
    menuService.dishes$.subscribe(res => dishes = res);
    menuService.getDishes();
    mockBackend.expectOne('http://localhost:3000/dishes').flush(mockedDishes);

    // then
    expect(dishes.length).toEqual(6);
    expect(loginService.checkLogin).toHaveBeenCalled();
  }));

  it('should load all pizza when getPizza', fakeAsync(() => {
    // given
    let dishes: Dish[];
    spyOn(loginService, "checkLogin").and.returnValue(true);

    // when
    menuService.dishes$.subscribe(res => dishes = res);
    menuService.getPizza();
    mockBackend.expectOne('http://localhost:3000/dishes?type=pizza').flush(mockedDishes);

    // then
    expect(dishes.length).toEqual(6);
    expect(loginService.checkLogin).toHaveBeenCalled();
  }));

  it('should load available pizza when getPizza', fakeAsync(() => {
    // given
    let dishes: Dish[];
    spyOn(loginService, "checkLogin").and.returnValue(false);

    // when
    menuService.dishes$.subscribe(res => dishes = res);
    menuService.getPizza();
    mockBackend.expectOne('http://localhost:3000/dishes?type=pizza').flush(mockedDishes);

    // then
    expect(dishes.length).toEqual(3);
    expect(loginService.checkLogin).toHaveBeenCalled();
  }));

  it('should load all noodles when getNoodles', fakeAsync(() => {
    // given
    let dishes: Dish[];
    spyOn(loginService, "checkLogin").and.returnValue(true);

    // when
    menuService.dishes$.subscribe(res => dishes = res);
    menuService.getNoodles();
    mockBackend.expectOne('http://localhost:3000/dishes?type=noodle').flush(mockedDishes);

    // then
    expect(dishes.length).toEqual(6);
    expect(loginService.checkLogin).toHaveBeenCalled();
  }));

  it('should load available noodles when getNoodles', fakeAsync(() => {
    // given
    let dishes: Dish[];
    spyOn(loginService, "checkLogin").and.returnValue(false);

    // when
    menuService.dishes$.subscribe(res => dishes = res);
    menuService.getNoodles();
    mockBackend.expectOne('http://localhost:3000/dishes?type=noodle').flush(mockedDishes);

    // then
    expect(dishes.length).toEqual(3);
    expect(loginService.checkLogin).toHaveBeenCalled();
  }));

  it('should load all drink when getDrinks', fakeAsync(() => {
    // given
    let dishes: Dish[];
    spyOn(loginService, "checkLogin").and.returnValue(true);

    // when
    menuService.dishes$.subscribe(res => dishes = res);
    menuService.getDrinks();
    mockBackend.expectOne('http://localhost:3000/dishes?type=drink').flush(mockedDishes);

    // then
    expect(dishes.length).toEqual(6);
    expect(loginService.checkLogin).toHaveBeenCalled();
  }));

  it('should load available drink when getDrinks', fakeAsync(() => {
    // given
    let dishes: Dish[];
    spyOn(loginService, "checkLogin").and.returnValue(false);

    // when
    menuService.dishes$.subscribe(res => dishes = res);
    menuService.getDrinks();
    mockBackend.expectOne('http://localhost:3000/dishes?type=drink').flush(mockedDishes);

    // then
    expect(dishes.length).toEqual(3);
    expect(loginService.checkLogin).toHaveBeenCalled();
  }));

  it('should change available a dish when changeAvailability', fakeAsync(() => {
    // given
    const isAvailable = mockedDish.isAvailable;
    // when
    menuService.changeAvailability(mockedDish);
    mockBackend.expectOne('http://localhost:3000/dishes/' + mockedDish.id);

    // then
    expect(mockedDish.isAvailable).toEqual(!isAvailable);
  }));

  it('should call get', fakeAsync(() => {
    // when
    menuService.get('http://localhost:3000/dishes/');
    mockBackend.expectOne('http://localhost:3000/dishes/');

  }));

  it('should add dish when addDish', fakeAsync(() => {
    // when
    menuService.addDish(mockedDish);
    const mockReq = mockBackend.expectOne('http://localhost:3000/dishes');
    console.log(mockReq);

    // then
    expect(mockReq.request.body).toEqual(mockedDish);
    expect(mockReq.request.method).toEqual('POST');

  }));

  it('should edit dish when editDish', fakeAsync(() => {

    // when
    menuService.editDish(mockedDish);
    mockBackend.expectOne("http://localhost:3000/dishes/" + mockedDish.id);

  }));

  it('should delete dish when deleteDish', fakeAsync(() => {
    // when
    menuService.deleteDish(mockedDish);
    mockBackend.expectOne('http://localhost:3000/dishes/' + mockedDish.id);

  }));



});
