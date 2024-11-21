import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserHomeComponent } from './admin/user-home/user-home.component';
import { UserStartComponent } from './admin/user-start/user-start.component';
import { ViewBlogDetailsComponent } from './admin/view-blog-details/view-blog-details.component';
import { ViewBlogListComponent } from './admin/view-blog-list/view-blog-list.component';
import { ViewCoursesComponent } from './admin/view-courses/view-courses.component';
//import { ViewBlogDetailsComponent } from './admin/view-blog-details/view-blog-details.component';
//import { ViewBlogListComponent } from './admin/view-blog-list/view-blog-list.component';

import { FullComponent } from './layouts/full/full.component';
import { UserFullComponent } from './layouts/user-full/user-full.component';

export const Approutes: Routes = [
  {
    path: 'start',
    component: UserStartComponent,
    children: [
      {
        path: '',
        component: UserHomeComponent,
      },
      {
        path: 'home',
        component: UserHomeComponent,
      },
      {
        path: 'courses',
        component: ViewCoursesComponent
      }
    ]
  },
  {
    path: 'viewBlogsList/:course',
    component: ViewBlogListComponent,
    children: [
      {
        path: ':buttonname',
        component: ViewBlogDetailsComponent,
      }
    ]
  },

  {
    path: 'accessonlynavalchand',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
 
  {
    path: '', redirectTo: '/start/home', pathMatch: 'full'
  }
  // {
  //   path:'**', component:UserStartComponent
  // }

  // {
  //   path: 'start',
  //   component: UserStartComponent,
  //   children: [{
  //     path: 'viewBlogs',
  //     component: ViewBlogListComponent
  //   },
  //   {
  //     path: 'viewBlogsList/:course',
  //     component: ViewBlogListComponent,
  //     children: [
  //       {
  //         path: ':buttonname',
  //         component: ViewBlogDetailsComponent,
  //       }
  //     ]
  //   }
  //   ]
  // },

  // {
  //   path: 'home',
  //   component: UserHomeComponent
  // },

  // {
  //   path: 'user',
  //   component: UserFullComponent,
  //   children: [{
  //     path: 'viewBlogs',
  //     component: ViewBlogListComponent
  //   }]
  // },
  
];
