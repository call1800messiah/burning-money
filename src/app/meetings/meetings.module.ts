import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateMeetingComponent } from './components/create-meeting/create-meeting.component';
import { MeetingsRoutingModule } from './meetings-routing.module';
import { HoldMeetingComponent } from './components/hold-meeting/hold-meeting.component';
import { MeetingListComponent } from './components/meeting-list/meeting-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MeetingsRoutingModule,
  ],
  declarations: [CreateMeetingComponent, HoldMeetingComponent, MeetingListComponent]
})
export class MeetingsModule { }
