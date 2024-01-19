import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  someTestValue = "Hey it is connected";
  @ViewChild('nameInput', { static: false}) nameInputRef: ElementRef;
 
  @ViewChild('nameInput', { static: false}) amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService){}

  onAddItem(){
   console.log("it is working_________-**"); 
    const ingredientName = this.nameInputRef.nativeElement.value;
    const ingredientAmount= this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
