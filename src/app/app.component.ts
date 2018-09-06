import { Component } from '@angular/core';
import {MenuService} from './shared/menu.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pizzeria Hakuna Matata';

  constructor(private menuService: MenuService, private router: Router) {}

  navigateToMenu() {
    this.menuService.getDishes();
    this.router.navigate(['/menu']);
  }
}
