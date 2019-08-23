import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonListComponent } from './components/person-list/person-list.component';



const routes: Routes = [
  {
    path: '',
    component: PersonListComponent
  },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class PeopleRoutingModule { }
