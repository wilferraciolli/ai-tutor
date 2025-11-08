import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RecipeService } from '../../services/recipe.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss'
})
export class RecipeForm {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _recipeService: RecipeService = inject(RecipeService);
  private readonly  _routerService = inject(Router);

  protected readonly form = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(50)]]
  });

  protected disabled: boolean = false;

  handleSubmit(): void {
    console.log(this.form.value);
    this._recipeService.addRecipe({
      id: this._recipeService.findNextId(),
      name: this.form.value.name ? this.form.value.name : '',
      description: this.form.value.description ? this.form.value.description : '',
      imgUrl: '',
      isFavorite: false,
      ingredients: [] 
    });

    this._routerService.navigate(['/']);
  }
}
