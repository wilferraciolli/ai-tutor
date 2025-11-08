import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RecipeService } from '../../services/recipe.service';
import { Router, RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

@Component({
  selector: 'app-recipe-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatButtonModule, MatTooltipModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss'
})
export class RecipeForm {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _recipeService: RecipeService = inject(RecipeService);
  private readonly _routerService = inject(Router);

  protected readonly form = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(50)]]
  });

  protected errorMessage: WritableSignal<string> = signal('');

  constructor() {
    merge(this.form.statusChanges, this.form.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  protected handleSubmit(): void {
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

  protected updateErrorMessage(): void {
    if (this.form.controls.name.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('');
    }
  }
}
