import { Injectable, inject } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { ShoppingListService } from "src/app/shopping-list/services/shopping-list.service";
import { Ingredient } from "src/app/shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // recipes: Recipe[] = [
    //     new Recipe(
    //         'Spaghetti Carbonara',
    //         'Classic Italian pasta dish with a rich, creamy sauce',
    //         'https://foodwhirl.com/wp-content/uploads/2017/02/spaghetti-carbonara-insta.jpg',
    //         [
    //             new Ingredient("Spaghetti", 1),
    //             new Ingredient("Eggs", 4),
    //             new Ingredient("Pancetta", 250),
    //             new Ingredient("Parmesan Cheese", 75),
    //         ],
    //         3,
    //     ),
    //     new Recipe(
    //         'Vegetable Stir Fry',
    //         'Quick and healthy stir fry with fresh vegetables',
    //         'https://therecipecritic.com/wp-content/uploads/2019/08/vegetable_stir_fry.jpg',
    //         [
    //             new Ingredient("Broccoli", 1),
    //             new Ingredient("Carrot", 2),
    //             new Ingredient("Bell Pepper", 1),
    //             new Ingredient("Soy Sauce", 2),
    //         ],
    //         4,
    //     ),
    //     new Recipe(
    //         'Chicken Curry',
    //         'Rich and flavorful Indian-style chicken curry',
    //         'https://www.supergoldenbakes.com/wordpress/wp-content/uploads/2020/01/Slow_Cooker_Curry-4-838x1024.jpg',
    //         [
    //             new Ingredient("Chicken", 500),
    //             new Ingredient("Onions", 2),
    //             new Ingredient("Tomatoes", 2),
    //             new Ingredient("Curry Powder", 1),
    //         ],
    //         5,
    //     )
    // ];

    recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes(): Recipe[] {
        console.log("********DEBUG********" + this.recipes.length)
        return this.recipes.slice()
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(id: number): Recipe {
        console.log("*****DEBUG**** Here is your id: ", id);

        const recipe = this.recipes.find((recipe: Recipe) => recipe.id === id);

        if (!recipe) {
            console.log(`*****DEBUG**** No recipe found with id: ${id}`);
            // Handle the "no recipe found" scenario here
            // You can throw an error or return a default value
            throw new Error(`No recipe found with id: ${id}`);
            // Or, if you prefer not to throw, you could return `null` or a default recipe object
            // return null;
            // return new Recipe('Default', '', '', [], -1); // Example of a default recipe
        }

        console.log("*****DEBUG**** Found recipe: ", recipe.name);
        return recipe;
    }

    setRecipes(updateRecipes: Recipe[]) {
        this.recipes = updateRecipes;
        this.recipesChanged.next(this.recipes.slice());
     }

    addRecipe(recipe: Recipe) {
        const newRecipeId = this.generateRandomId(1, 10000);
        recipe.id = newRecipeId;
        console.log("****DEBUG*****" + recipe.id + " name: " + recipe.name);
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
        console.log("********DEBUG********" + this.recipes.length)
    }

    updateRecipe(atId: number, withUpdatedRecipe: Recipe) {
        // Find the index of the recipe with the given id
        const index = this.recipes.findIndex(recipe => recipe.id === atId);

        // Check if the recipe was found (index will be -1 if not found)
        if (index !== -1) {
            // Update the recipe at the found index
            this.recipes[index] = withUpdatedRecipe;
            // Log the updated recipes array for debugging
            console.log("********DEBUG******** Updated recipes:", this.recipes);
            this.recipesChanged.next(this.recipes.slice())
        } else {
            // Handle the case where the recipe with the given id is not found
            console.log(`********DEBUG******** No recipe found with id: ${atId} here are the list of recipes ${this.recipes}`);
        }
    }
    deleteRecipe(atId: number) {
        // Find the index of the recipe with the given id
        const index = this.recipes.findIndex(recipe => recipe.id === atId);

        // Check if the recipe was found (index will be -1 if not found)
        if (index !== -1) {
            // Update the recipe at the found index
            this.recipes.splice(index, 1)
            // Log the updated recipes array for debugging
            console.log("********DEBUG******** Deleted recipes:", this.recipes);
            this.recipesChanged.next(this.recipes.slice())
        } else {
            // Handle the case where the recipe with the given id is not found
            console.log(`********DEBUG******** No recipe found with id: ${atId} here are the list of recipes ${this.recipes}`);
        }
    }

    deleteIngredient(atIndex: number, inRecipe: Recipe) {
        // Find the index of the recipe with the given id
        const index = this.recipes.findIndex(recipe => recipe.id === inRecipe.id);

        // Check if the recipe was found (index will be -1 if not found)
        if (index !== -1) {
            // Update the recipe at the found index

            this.recipes[index].ingredients.splice(atIndex, 1);
            // Log the updated recipes array for debugging
            console.log("********DEBUG******** delete ingredient in recipes:", this.recipes);
            this.recipesChanged.next(this.recipes.slice())
        } else {
            // Handle the case where the recipe with the given id is not found
            console.log(`********DEBUG******** No recipe found with id: ${atIndex} here are the list of recipes ${this.recipes}`);
        }
    }

    generateRandomId(min: number, max: number): number {
        // Ensure the range is valid
        if (min >= max) {
            throw new Error("Minimum value must be less than the maximum value.");
        }
        // Generate a random number within the specified range
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



}