import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;

  someTestValue = "Hey it is connected";
  startedEditingSubscription: Subscription;
  isEditMode = false;
  editedItemIndex: number;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.startedEditingSubscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.isEditMode = true;
      this.editedItemIndex = index;
      let editedIngredient = this.shoppingListService.getIngredient(index);
      this.shoppingListForm.setValue({
        name: editedIngredient.name,
        amount: editedIngredient.amount
      })
    })
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    console.log("it is working_________-**");
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.isEditMode) {
      this.shoppingListService.updateIgredient(newIngredient, this.editedItemIndex);
      console.log("edited ingredient" + newIngredient.name + newIngredient.amount);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.reset()
  }

  delete() {
    if (this.isEditMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      console.log("deleted ingredient at index " + this.editedItemIndex);
      this.reset();
    }
  }

  reset() {
    this.editedItemIndex = null;
    this.isEditMode = false;
    this.shoppingListForm.reset();
  }
}
