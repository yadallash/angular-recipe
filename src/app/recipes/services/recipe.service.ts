import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { ShoppingListService } from "src/app/shopping-list/services/shopping-list.service";
import { Ingredient } from "src/app/shared/ingredient.model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    recipes: Recipe[] = [
        new Recipe('A test Recipe','This is a simple a test ', 'https://carnivalmunchies.com/wp-content/uploads/2015/09/tom-yum-1.jpg'),
        new Recipe('Tom yum Recipe','Such a delight to eat ', 'https://carnivalmunchies.com/wp-content/uploads/2015/09/tom-yum-1.jpg'),
    
      ];


      constructor(private shoppingListService: ShoppingListService) {}

      getRecipes() : Recipe[] {
        return this.recipes.slice()
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
      }

}