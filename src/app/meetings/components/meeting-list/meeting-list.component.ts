import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService, Meeting } from '@app/core';



@Component({
  selector: 'bm-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss']
})
export class MeetingListComponent implements OnInit {
  private meetings$: Observable<Meeting[]>;

  constructor(private dataService: DataService) { 
    this.meetings$ = this.dataService.getMeetings();
  }

  ngOnInit() {
  }
  
  deleteMeeting(id: string) {
    this.dataService.deleteMeeting(id)
  }

  meetingFinished(meeting: Meeting): boolean {
    return meeting.endTime !== undefined;
  }
}
