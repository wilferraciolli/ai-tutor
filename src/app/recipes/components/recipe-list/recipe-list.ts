import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { RecipeModel } from '../../../models';
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

    if (term) {
      return this.recipes()
        .filter(recipe => recipe.name.toLowerCase()
          .includes(term.toLocaleLowerCase()));
    }

    return this.recipes();
  });

  protected clearSearch(): void {
    this.searchTerm.set(null);
  }
}
