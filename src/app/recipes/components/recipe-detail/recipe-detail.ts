import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, InputSignal, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { RecipeModel, Ingredient } from '../../../models';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss'
})
export class RecipeDetail implements OnInit {
  protected id: InputSignal<number> = input<number>(0);

  private readonly _recipeService: RecipeService = inject(RecipeService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  // protected selectedRecipeId: Signal<number> = computed(() => this.id());
  protected servingsCount = signal(1);
  protected selectedRecipe: WritableSignal<RecipeModel | null> = signal(null);
  protected selectedRecipeIngredients: Signal<Array<Ingredient>>
    = computed(() => {
      const recipe = this.selectedRecipe();

      if (recipe) {
        return recipe.ingredients.map(ingredient => ({
          ...ingredient,
          quantity: ingredient.quantity * this.servingsCount()
        }));
      } else {
        return new Array();
      }
    });

  public ngOnInit(): void {
    const id: number = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this.selectedRecipe.set(this._recipeService.getRecipe(id));
  }

  protected increment(): void {
    this.servingsCount.update(count => count + 1);
  }

  protected decrement(): void {
    this.servingsCount.update(count => count - 1);
  }
}
