import { Routes } from '@angular/router';
import { AddBlogsComponent } from './add-blogs/add-blogs.component';
import { AddCourseComponent } from './add-course/add-course.component';

export const AdminRoutingModule: Routes = [
	{
		path: '',
		children: [
			{
				path: 'blogs',
				component: AddBlogsComponent
			},
			{
				path: 'course',
				component: AddCourseComponent
			}
		]
	}
];
