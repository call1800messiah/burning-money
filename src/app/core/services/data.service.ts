import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as uuid from 'uuid';


import { Meeting } from '../models/meeting';
import { Person } from '../models/person';
import { StorageService } from './storage.service';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private meetings: Map<string, Meeting>;
  private meetingsSubject: BehaviorSubject<Meeting[]>;
  private people: Map<string, Person>;
  private peopleSubject: BehaviorSubject<Person[]>

  constructor(private storageService: StorageService) {
    this.people = new Map();
    this.peopleSubject = new BehaviorSubject(Array.from(this.people.values()));
    this.storageService.loadPeople().subscribe((people) => {
      if (people) {
        this.people = people;
        this.peopleSubject.next(Array.from(this.people.values()));
      } else {
        console.log('No people found in local storage');
      }
    });
    
    this.meetings = new Map();
    this.meetingsSubject = new BehaviorSubject(Array.from(this.meetings.values()));
    this.storageService.loadMeetings().subscribe((meetings) => {
      if (meetings) {
        this.meetings = meetings;
        this.meetingsSubject.next(Array.from(this.meetings.values()));
      } else {
        console.log('No meetings found in local storage');
      }
    });
  }
  
  createMeeting(meeting: Meeting): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      meeting.id = this.getNewId();
      meeting.people.forEach((person) => {
        if (person.id === undefined) {
          this.createPerson(person).then((personID: string) => {
            person = this.getPerson(personID);
          });
        }
      });
      this.meetings.set(meeting.id, meeting);
      this.modifyMeetings();
      resolve(meeting.id);
    });
    return promise;
  }
  
  createPerson(person: Person): Promise<string|boolean> {
    const promise = new Promise<any>((resolve, reject) => {
      person.id = this.getNewId();
      this.people.set(person.id, person);
      this.modifyPeople();
      resolve(person.id);
    });
    return promise;
  }
  
  deleteMeeting(id: string): void {
    if (this.meetings.has(id)) {
      this.meetings.delete(id);
      this.modifyMeetings();
    }
  }
  
  deletePerson(id: string): void {
    if (this.people.has(id)) {
      this.people.delete(id);
      this.modifyPeople();
    }
  }
  
  getMeeting(id: string): Observable<Meeting> {
    const meeting = this.meetings.get(id);
    return new BehaviorSubject(meeting).asObservable();
  }
  
  getMeetings(): Observable<Meeting[]> {
    return this.meetingsSubject.asObservable();
  }
    
  getPeople(): Observable<Person[]> {
    return this.peopleSubject.asObservable();
  }
  
  getPerson(id: string): Person {
    return this.people.get(id);
  }
  
  updateMeeting(meeting: Meeting): void {
    this.meetings.set(meeting.id, meeting);
    this.modifyMeetings();
  }
  
  updatePerson(person: Person): void {
    this.people.set(person.id, person);
    this.modifyPeople();
  }
  
  private getNewId(): string {
    return uuid.v4();
  }
  
  private modifyMeetings() {
    this.storageService.storeMeetings(this.meetings).subscribe((success) => {
      // TODO: Do something if saving fails
      if (!success) {
        console.log('Couldn\'t save meetings to local storage');
      }
    });
    this.meetingsSubject.next(Array.from(this.meetings.values()));
  }
  
  private modifyPeople() {
    this.storageService.storePeople(this.people).subscribe((success) => {
      // TODO: Do something if saving fails
      if (!success) {
        console.log('Couldn\'t save meetings to local storage');
      }
    });
    this.peopleSubject.next(Array.from(this.people.values()));
  }
}
