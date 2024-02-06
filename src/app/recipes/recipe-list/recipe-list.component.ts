import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {


  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe((updatedRecipes)=>{
      this.recipes = updatedRecipes;
    })
  }
  onNewRecipeClicked() {
    console.log("new Recipe buttton clicked")
    this.router.navigate(
      ['new'], 
      { relativeTo: this.activatedRoute })
  }
}
