import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../shared/dish';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
 @Input() order: Dish[];
  constructor() { }

  ngOnInit() {
  }

}
