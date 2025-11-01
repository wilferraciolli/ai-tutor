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

}
