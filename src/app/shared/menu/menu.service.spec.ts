import {TestBed, inject, fakeAsync} from '@angular/core/testing';

import { MenuService } from './menu.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpHandler} from "@angular/common/http";
import {Dish} from "../models/dish";

fdescribe('MenuService', () => {
  let service: MenuService;
  const mockedDish: Dish = {
    description: 'testowe skladniki',
    id: 123,
    isAvailable: false,
    name: 'testowe danie',
    price: 100000,
    type: 'fastfood'
  };
  let mockBackend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService],
      imports: [ HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.get(MenuService);
    mockBackend = TestBed.get(HttpTestingController);
  });

  it('should create service', () => {
    // then
    expect(service).toBeTruthy();
  });

  it('should load a dish', fakeAsync(() => {
    // given
    let dish: Dish;

    // when
    service.getDish(mockedDish.id).subscribe(res => dish = res);
    mockBackend.expectOne('http://localhost:3000/dishes/' + mockedDish.id).flush(mockedDish);

    // then
    expect(dish).toEqual(mockedDish);
  }));

});
