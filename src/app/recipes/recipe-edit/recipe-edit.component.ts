import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id?: number
  editMode = false;
  recipeForm: FormGroup;

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {

  }
  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log("this is edite mode " + this.editMode + this.id)
        this.initForm();
      })
  }

  private initForm() {

    let recipeName = '';
    let recipePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipePath = recipe.imagePath;
      recipeDescription = recipe.description
      if (recipe.ingredients != null, recipe.ingredients.length > 0) {
        recipe.ingredients.forEach((ingredient) => {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        })
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
    })
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value["name"],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    )

    if (this.editMode && this.id != null) {
      this.recipeService.updateRecipe(this.id, newRecipe)
      console.log("DEBUG Tryin to update an existing recipe ");
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
  }


  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl([Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
    console.log("New ingredient added entry");
  }

  onDeleteIngredient(atIndex: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(atIndex)

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      this.recipeService.deleteIngredient(atIndex, recipe);
      
    }
  }

}
