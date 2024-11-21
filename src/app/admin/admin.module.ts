import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { AddBlogsComponent } from './add-blogs/add-blogs.component';
import { FormsModule } from '@angular/forms';
import { SafePipeModule } from 'safe-pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddCourseComponent } from './add-course/add-course.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ProgessBarBailogComponent } from './progess-bar-bailog/progess-bar-bailog.component';


@NgModule({
  declarations: [
    AddBlogsComponent,
    AddCourseComponent,
    ViewCoursesComponent,
    ProgessBarBailogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SafePipeModule,
    RouterModule.forChild(AdminRoutingModule),
    AngularEditorModule,
    MatProgressBarModule,
    MatDialogModule
  ]
  
})
export class AdminModule { }
