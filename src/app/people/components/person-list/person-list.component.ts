import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService, Person } from '@app/core';



@Component({
  selector: 'bm-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  private people$: Observable<Person[]>;

  constructor(private dataService: DataService) {
    this.people$ = this.dataService.getPeople();
  }

  ngOnInit() {
  }

  deletePerson(id: string) {
    this.dataService.deletePerson(id);
  }
}
