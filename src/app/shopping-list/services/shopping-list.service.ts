import { EventEmitter } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";

export class ShoppingListService{
    didIngredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient("apples", 5),
        new Ingredient("lemons", 2),
    ]

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.didIngredientsChanged.emit(this.ingredients.slice());

    }


    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.didIngredientsChanged.emit(this.ingredients.slice());
    }


}