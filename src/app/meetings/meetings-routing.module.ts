import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMeetingComponent } from './components/create-meeting/create-meeting.component';
import { HoldMeetingComponent } from './components/hold-meeting/hold-meeting.component';
import { MeetingListComponent } from './components/meeting-list/meeting-list.component';



const routes: Routes = [
  {
    path: '',
    component: MeetingListComponent
  },
  {
    path: 'create',
    component: CreateMeetingComponent
  },
  {    
    path: 'hold/:id',
    component: HoldMeetingComponent
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
export class MeetingsRoutingModule { }
