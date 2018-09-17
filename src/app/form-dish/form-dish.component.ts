import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Dish} from "../shared/models/dish";
import {MenuService} from "../shared/menu/menu.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form-dish',
  templateUrl: './form-dish.component.html',
  styleUrls: ['./form-dish.component.scss']
})
export class FormDishComponent implements OnInit {
  dishForm = new FormGroup(
    {
      name: new FormControl(this.activeRoute.snapshot.paramMap.get('name'),
        [Validators.required, Validators.minLength(4)]),
      type: new FormControl(this.activeRoute.snapshot.paramMap.get('type'),
        [Validators.required]),
      price: new FormControl(this.activeRoute.snapshot.paramMap.get('price'),
        [Validators.required, Validators.pattern("[0-9,.]*")] ),
      description: new FormControl(this.activeRoute.snapshot.paramMap.get('description'),
        Validators.required),
      isAvailable: new FormControl(this.activeRoute.snapshot.paramMap.get('isAvailable'),
        Validators.required),
    });
  constructor(private readonly menuService: MenuService,
              private readonly router: Router,
              private readonly activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.dishForm.valid) {
      const dish: Dish = {} as Dish;
      dish.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
      dish.name = this.dishForm.get('name').value;
      dish.description = this.dishForm.get('description').value;
      dish.price = this.dishForm.get('price').value;
      dish.type = this.dishForm.get('type').value;
      dish.isAvailable = this.dishForm.get('isAvailable').value;
      if (dish.id > 0) {
        this.menuService.editDish(dish);
      } else {
        this.menuService.addDish(dish);
      }
      this.router.navigate(['/menu']);
    } else {
      alert("Invalid input data");
    }
  }

}
