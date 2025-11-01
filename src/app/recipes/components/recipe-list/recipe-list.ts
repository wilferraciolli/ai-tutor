import { CommonModule } from '@angular/common';
import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { MOCK_RECIPES } from '../../../mock-recipes';
import { RecipeModel, Ingredient } from '../../../models';


@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList {
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
