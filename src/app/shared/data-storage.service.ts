import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/services/recipe.service";
import { Recipe } from "../recipes/models/recipe.model";
import { map, tap } from 'rxjs/operators';
import { Observable } from "rxjs";


@Injectable()
export class DataStorageService {

    readonly baseURL = "EnterYourURLHere";

    constructor(private httpClient: HttpClient, private recipeServices: RecipeService) { }


    storeRecipes() {
        const recipes = this.recipeServices.getRecipes();

        this.httpClient
            .put(
                `${this.baseURL}/recipes.json`,
                recipes
            ).subscribe((response) => {
                console.log(response);
            });
    }


    fetchRecipes(): Observable<Recipe[]> {
        return this.httpClient.get<Recipe[]>(`${this.baseURL}/recipes.json`)
            .pipe(
                map((recipes: Recipe[]) => {
                    return recipes.map((recipe: Recipe) => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    })
                }),
                tap((response) => {
                    console.log(response);
                    let recipesFromResponse = (<Recipe[]>response)
                    this.recipeServices.setRecipes(recipesFromResponse);
                })
            )
    }
}