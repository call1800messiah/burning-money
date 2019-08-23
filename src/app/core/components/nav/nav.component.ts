import { Component, OnInit } from '@angular/core';

import { Meeting } from '../../models/meeting';
import { Person } from '../../models/person';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'bm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public meetings: Meeting[];
  public people: Person[];

  constructor(private dataService: DataService) {
    this.dataService.getMeetings().subscribe((meetings) => {
      this.meetings = meetings;
    });
    this.dataService.getPeople().subscribe((people) => {
      this.people = people;
    })
  }

  ngOnInit() {
  }

}
