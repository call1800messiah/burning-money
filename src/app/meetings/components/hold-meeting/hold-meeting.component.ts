import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { Meeting, BurnService } from '@app/core';



@Component({
  selector: 'bm-hold-meeting',
  templateUrl: './hold-meeting.component.html',
  styleUrls: ['./hold-meeting.component.scss']
})
export class HoldMeetingComponent implements OnInit {
  private meeting$: Observable<Meeting>;
  private burned$: Observable<number>;
  private wasted$: Observable<number>;

  constructor(
    private burnService: BurnService,
    private route: ActivatedRoute,
  ) { 
    this.route.paramMap.subscribe((map: ParamMap) => {
      this.meeting$ = this.burnService.setupBurn(map.get('id'));
      this.burned$ = this.burnService.getBurnedAmount();
      this.wasted$ = this.burnService.getWastedTime();
    });
  }

  ngOnInit() {
    
  }

  pauseMeeting() {
    this.burnService.pauseMeeting();
  }
  
  startMeeting() {
    this.burnService.startMeeting();
  }
  
  stopMeeting() {
    this.burnService.stopMeeting();
  }
}
