import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, DatePipe, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';


import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AdminModule } from './admin/admin.module';
import { UserFullComponent } from './layouts/user-full/user-full.component';
import { SafePipeModule } from 'safe-pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { UserNavigationComponent } from './shared/header/user-navigation/user-navigation.component';
import { ViewBlogDetailsComponent } from './admin/view-blog-details/view-blog-details.component';
import { ViewBlogListComponent } from './admin/view-blog-list/view-blog-list.component';
import { UserHomeComponent } from './admin/user-home/user-home.component';
import { UserStartComponent } from './admin/user-start/user-start.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    UserFullComponent,
    ViewBlogDetailsComponent,
    ViewBlogListComponent,
    UserNavigationComponent,
    UserHomeComponent,
    UserStartComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false, relativeLinkResolution: 'legacy' }),
    PerfectScrollbarModule,
    AdminModule,
    SafePipeModule,
    AngularEditorModule,
    HighlightModule,
    MatProgressBarModule
   // HighlightJsModule 
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
    provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    },
    DatePipe,
    UserHomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
