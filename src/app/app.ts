/*!
 * @license
 * Copyright 2025 Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import {Component, Signal, signal, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { MOCK_RECIPES } from './mock-recipes';
import { RecipeModel } from './models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('My Recipe Box');
  protected readonly recipes: Signal<RecipeModel[]> = signal(MOCK_RECIPES)
  protected selectedRecipe: WritableSignal<RecipeModel> = signal(this.recipes()[0]);

  protected selectRecipe(recipeId: number) : void {
    const clickedRecipe: RecipeModel | undefined = this.recipes()
    .find(recipe => recipe.id === recipeId);

  this.selectedRecipe.set(clickedRecipe 
      ? clickedRecipe 
      : this.recipes()[0])  
  }
}
