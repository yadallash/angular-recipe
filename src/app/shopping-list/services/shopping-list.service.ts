import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";

export class ShoppingListService {
    didIngredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Garlic piece', 2),
        new Ingredient('grape tomatoes', 4),
        new Ingredient('red peppers', 2),
    ];

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    getIngredient(atIndex: number): Ingredient {
        return this.ingredients.slice()[atIndex];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.didIngredientsChanged.next(this.ingredients.slice());
        console.log("Ingredient has been added" + ingredient.name + ingredient.amount)
    }

    deleteIngredient(atIndex: number) {
        if (atIndex < this.ingredients.length, atIndex >= 0) {
            this.ingredients.splice(atIndex, 1);
            this.didIngredientsChanged.next(this.ingredients.slice());
        }
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.didIngredientsChanged.next(this.ingredients.slice());
    }

    updateIgredient(updateIgredient: Ingredient, index: number) {
        if (index < this.ingredients.length, index >= 0) {
            this.ingredients[index] = updateIgredient;
            this.didIngredientsChanged.next(this.ingredients.slice());
        } else {
            throw console.error("No ingredient exist for this index");
        }
    }
}