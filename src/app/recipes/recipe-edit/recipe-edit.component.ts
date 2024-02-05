import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id?: number
  editMode = false;
  recipeForm: FormGroup;


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
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipePath = recipe.imagePath;
      recipeDescription = recipe.description
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipePath),
      'description': new FormControl(recipeDescription),
    })
  }
}
