import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {MenuService} from "../shared/menu/menu.service";
import {BasketComponent} from "../basket/basket.component";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Router} from "@angular/router";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Dish} from "../shared/models/dish";
import {Observable, Subject} from "rxjs";
import {LoginService} from "../shared/login/login.service";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let service: MenuService;
/*(Observable.of(Dish[]))*/
  const menuServiceMock = {
    getDishes: jasmine.createSpy('getDishes'),
    dishes$: new Subject<Dish[]>(),
  };

  const loginServiceMock = {
    login$: new Subject<boolean>(),
    checkLogin: jasmine.createSpy('checkLogin')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ MenuComponent ],
      providers: [{provide: MenuService, useValue: menuServiceMock},
        {provide: LoginService, useValue: loginServiceMock}
      ],

      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MenuService);
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('should get dishes', () => {
    // when
    component.getDishes();
    // then
    expect(service.getDishes).toHaveBeenCalled();
  });
});
