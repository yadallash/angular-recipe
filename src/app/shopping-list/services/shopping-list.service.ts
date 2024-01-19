import { EventEmitter } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";

export class ShoppingListService {
    didIngredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Garlic piece', 2),
        new Ingredient('grape tomatoes', 4),
        new Ingredient('red peppers', 2),
    ];


    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.didIngredientsChanged.emit(this.ingredients.slice());

    }


    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.didIngredientsChanged.emit(this.ingredients.slice());
    }


}