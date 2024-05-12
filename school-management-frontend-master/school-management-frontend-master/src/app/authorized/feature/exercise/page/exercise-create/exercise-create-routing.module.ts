import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseCreateComponent } from './exercise-create.component';

const routes: Routes = [
  {
    path: '',
    component: ExerciseCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseCreateRoutingModule {}