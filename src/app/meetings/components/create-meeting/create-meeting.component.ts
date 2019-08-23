import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService, Meeting, Person } from '@app/core';



@Component({
  selector: 'bm-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {
  public meeting: Meeting;
  public newPerson: Person;

  constructor(private dataService: DataService, private router: Router) {
    this.meeting = new Meeting('', []);
    this.newPerson = new Person('', 0, 0);
  }

  ngOnInit() {
  }
  
  addPerson(person: Person): void {
    this.meeting.people.push(new Person(person.name, person.rate, person.salary));
    console.log(this.meeting);
    this.newPerson = new Person('', 0, 0);
  }
  
  cantCreateMeeting() {
    return this.meeting.name.trim() === '' || this.meeting.people.length < 2;
  }

  onSubmit(): void {
    this.dataService.createMeeting(this.meeting).then((meetingID: number) => {
      this.router.navigate(['/meetings/hold', meetingID]);
    });
  }
  
  removePerson(index: number): void {
    this.meeting.people.splice(index, 1);
  }
}
