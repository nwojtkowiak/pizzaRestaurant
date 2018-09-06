import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Dish} from './dish';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  dishes$ = new Subject<Dish[]>();

  constructor( readonly  httpClient: HttpClient) { }

  getDish(id: number): Observable<Dish> {
    return this.httpClient.get<Dish>('http://localhost:3000/dishes/' + id);
  }

  getDishes() {
    this.httpClient.get<Dish[]>('http://localhost:3000/dishes').subscribe( dishes =>  this.dishes$.next(dishes));
  }

  getPizza() {
   /* return this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=pizza');*/
    this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=pizza').subscribe( dishes =>  this.dishes$.next(dishes));
  }

  getNoodles() {
    /*return this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=noodle');*/
    this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=noodle').subscribe( dishes =>  this.dishes$.next(dishes));
  }

  getDrinks() {
    /*return this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=drink');*/
    this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=drink').subscribe( dishes =>  this.dishes$.next(dishes));
  }

  addDish(dish: Dish) {
    this.httpClient.post('http://localhost:3000/dishes', dish).subscribe(
      res => this.getDishes()
    );
  }

}
