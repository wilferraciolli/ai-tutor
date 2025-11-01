/*!
 * @license
 * Copyright 2025 Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import {Component, computed, Signal, signal, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { MOCK_RECIPES } from './mock-recipes';
import { Ingredient, RecipeModel } from './models';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('My Recipe Box');
  protected readonly recipes: Signal<RecipeModel[]> = signal(MOCK_RECIPES)
  
  protected selectedRecipe: WritableSignal<RecipeModel> = signal(this.recipes()[0]);
  protected selectedRecipeIngredients: Signal<Array<Ingredient>> 
  = computed(() => this.selectedRecipe().ingredients
.map(ingredient => ({...ingredient, quantity: ingredient.quantity * this.servingsCount()})));
  
  protected servingsCount = signal(1);

  protected selectRecipe(recipeId: number) : void {
    const clickedRecipe: RecipeModel | undefined = this.recipes()
    .find(recipe => recipe.id === recipeId);

  this.selectedRecipe.set(clickedRecipe 
      ? clickedRecipe 
      : this.recipes()[0])  
  }

  protected increment(): void {
    this.servingsCount.update(count => count + 1);
  }

  protected decrement(): void {
    this.servingsCount.update(count => count - 1);
  }
}
