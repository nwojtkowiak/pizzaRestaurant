import { TestBed, inject } from '@angular/core/testing';

import { OrderService } from './order.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

let service: OrderService;
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('OrderService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService],
      imports: [ HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.get(OrderService);

  });

  it('should create service', () => {
    // then
    expect(service).toBeTruthy();
  });


});
