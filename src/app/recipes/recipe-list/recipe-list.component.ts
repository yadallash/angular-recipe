import { Component } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A test Recipe','This is a simple a test ', 'https://carnivalmunchies.com/wp-content/uploads/2015/09/tom-yum-1.jpg'),
    new Recipe('Tom yum Recipe','Such a delight to eat ', 'https://carnivalmunchies.com/wp-content/uploads/2015/09/tom-yum-1.jpg'),

  ];

}
