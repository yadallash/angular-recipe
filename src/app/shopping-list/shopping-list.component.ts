import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']

})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];

  private cancellableSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {

  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.cancellableSubscription = this.shoppingListService.didIngredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })

  }
  ngOnDestroy(): void {
    this.cancellableSubscription.unsubscribe();
  }
  onEditItem(index: number) {
    console.log("current index of the item is " + index);
    this.shoppingListService.startedEditing.next(index);

  }
}
