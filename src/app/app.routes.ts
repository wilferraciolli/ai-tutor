/*!
 * @license
 * Copyright 2025 Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Routes } from '@angular/router';
import { RecipeList } from './recipes/components/recipe-list/recipe-list';
import { RecipeDetail } from './recipes/components/recipe-detail/recipe-detail';

export const routes: Routes = [
    // { path: '', redirectTo: '/recipes', },
    { path: '', component: RecipeList },
    { path: 'recipes/:id', component: RecipeDetail }
];
