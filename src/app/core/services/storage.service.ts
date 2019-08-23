import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable, BehaviorSubject } from 'rxjs';

import { Meeting } from '../models/meeting';
import { Person } from '../models/person';



@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(protected localStorage: LocalStorage) {}

  loadMeetings(): Observable<Map<string, Meeting>>|null {
    return this.localStorage.getItem('meetings');
  }
  
  loadPeople(): Observable<Map<string,Person>>|null {
    return this.localStorage.getItem('people');
  }
  
  storeMeetings(meetings: Map<string, Meeting>): Observable<boolean> {
    return this.localStorage.setItem('meetings', meetings);
  }
  
  storePeople(people: Map<string,Person>): Observable<boolean> {
    return this.localStorage.setItem('people', people);
  }
}
