import {  Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { ShoppingListService } from "src/app/shopping-list/services/shopping-list.service";
import { Ingredient } from "src/app/shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    recipes: Recipe[] = [
        new Recipe(
            1,
            'A test Recipe',
            'This is a simple a test ',
            'https://carnivalmunchies.com/wp-content/uploads/2015/09/tom-yum-1.jpg',
            [new Ingredient("coconuts", 5)]),
        new Recipe(
            2,
            'Tom yum Recipe',
            'Such a delight to eat ',
            'https://carnivalmunchies.com/wp-content/uploads/2015/09/tom-yum-1.jpg',
            [
                new Ingredient("coconuts", 5)
            ]
        ),

    ];


    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes(): Recipe[] {
        return this.recipes.slice()
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(id: number): Recipe {
        const recipe = this.recipes.find((recipe: Recipe) => {
            return recipe.id === id
        });
        console.log("********DEBUG********" + recipe.name)
        return recipe
    }

}