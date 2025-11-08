import { Injectable } from '@angular/core';
import { MOCK_RECIPES } from '../../mock-recipes';
import { RecipeModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public getAllRecipes(): Array<RecipeModel> {
    return MOCK_RECIPES;
  }

  public getRecipe(recipeId: number): RecipeModel {
    const recipe: RecipeModel | undefined = this.getAllRecipes()
      .find(recipe => recipe.id === recipeId);

    if (recipe) {
      return recipe;
    }
    return this.getAllRecipes()[0];
  }

  public addRecipe(recipe: RecipeModel): void {
    this.getAllRecipes().push(recipe);
  }

  public findNextId(): number {
  return this.getAllRecipes().length + 1;
  }
}
