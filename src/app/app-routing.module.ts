import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';



const routes: Routes = [
  {
    loadChildren: './meetings/meetings.module#MeetingsModule',
    path: 'meetings',
  },
  {
    loadChildren: './people/people.module#PeopleModule',
    path: 'people',
  },
  {    
    path: '',
    pathMatch: 'full',
    redirectTo: '/meetings',
  },
  {
    component: PageNotFoundComponent,
    path: '**',    
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ]
})
export class AppRoutingModule {}
