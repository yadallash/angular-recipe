import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const testRecipe = this.recipeService.getRecipe(1);
    console.log(testRecipe);

    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        console.log("Here is your id " + this.id);
        this.recipe = this.recipeService.getRecipe(this.id);
      })
  }


  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
