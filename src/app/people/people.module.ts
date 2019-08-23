import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleRoutingModule } from '@app/people/people-routing.module';
import { PersonListComponent } from './components/person-list/person-list.component';

@NgModule({
  imports: [
    CommonModule,
    PeopleRoutingModule
  ],
  declarations: [PersonListComponent]
})
export class PeopleModule { }
