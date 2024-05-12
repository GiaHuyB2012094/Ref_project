import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePostEditComponent } from './course-post-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CoursePostEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursePostEditRoutingModule {}
