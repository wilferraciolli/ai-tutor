import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MOCK_RECIPES } from '../../../mock-recipes';
import { RecipeModel, Ingredient } from '../../../models';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList {
  private readonly _recipeService: RecipeService = inject(RecipeService);

  protected readonly recipes: Signal<RecipeModel[]> = signal(this._recipeService.getAllRecipes());
  protected searchTerm: WritableSignal<string | null> = signal(null);
  protected readonly filteredRecipes: Signal<RecipeModel[]> = computed(() => {
    const term = this.searchTerm();

    if(term){
      return this.recipes()
      .filter(recipe => recipe.name.toLowerCase()
      .includes(term.toLocaleLowerCase()));
    }
  
      return this.recipes();
  });
  
  protected selectedRecipe: WritableSignal<RecipeModel> = signal(this.recipes()[0]);
  protected selectedRecipeIngredients: Signal<Array<Ingredient>> 
  = computed(() => this.selectedRecipe().ingredients.map(ingredient => ({...ingredient, quantity: ingredient.quantity * this.servingsCount()})));
  
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

  // protected search(query: string): void {
  //   this.searchTerm().set(query);
  // }
  
  protected clearSearch(): void {
   this.searchTerm.set(null);
  }
}
