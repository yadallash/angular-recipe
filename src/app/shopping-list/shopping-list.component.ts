import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {

  ingredients: Ingredient[]=[
    new Ingredient('Garlic piece', 2),
    new Ingredient('grape tomatoes', 4),
    new Ingredient('red peppers', 2),

  ];
}
