import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { BurnData } from '../models/burn-data';
import { Meeting } from '../models/meeting';
import { DataService } from './data.service';



@Injectable({
  providedIn: 'root'
})
export class BurnService {
  private burnedAmount: BurnData;
  private burnedAmountSubject: BehaviorSubject<number>;
  private meeting: Meeting;
  private meeting$: BehaviorSubject<Meeting>;
  private meetingInProgress: boolean;
  private mode: string;
  private timer;
  private wastedTimeSubject: BehaviorSubject<number>

  constructor(private dataService: DataService) {
    console.log('Initializing burn service');
    this.meeting$ = new BehaviorSubject(new Meeting(''));
    this.meetingInProgress = false;
    this.mode = 'rate';
    this.burnedAmount = new BurnData(0, 0, 0);
    this.burnedAmountSubject = new BehaviorSubject(this.burnedAmount[this.mode]);
    this.wastedTimeSubject = new BehaviorSubject(this.burnedAmount.time);
  }
  
  getBurnedAmount(): Observable<number> {
    return this.burnedAmountSubject.asObservable();
  }
  
  getWastedTime(): Observable<number> {
    return this.wastedTimeSubject.asObservable();
  }
  
  pauseMeeting() {
    this.pauseTimer();
    const eLength = this.meeting.episodes.length;
    this.meeting.episodes[eLength - 1].endTime = new Date();
    this.meetingInProgress = false;
    // this.dataService.updateMeeting(this.meeting);
  }
  
  setupBurn(meetingId: string): Observable<Meeting> {
    if (!this.meetingInProgress) {
      console.log('No meeting in progress')
      this.dataService.getMeeting(meetingId).subscribe((meeting) => {
        console.log(meeting);
        this.meeting = meeting;
        this.meeting$.next(this.meeting);
      });
    }
    
    return this.meeting$.asObservable();
  }
  
  setMode(mode: string) {
    this.mode = mode;
  }
  
  startMeeting() {
    if (!this.meeting.startTime) {
      this.meeting.startTime = new Date();
    }
    if (this.meeting.episodes === undefined) {
      this.meeting.episodes = [];
    }
    this.meeting.episodes.push({ startTime: this.meeting.startTime, endTime: null });
    // this.dataService.updateMeeting(this.meeting);
    this.meetingInProgress = true;
    this.startTimer();
  }
  
  stopMeeting() {
    this.pauseTimer();
    const eLength = this.meeting.episodes.length;
    const lastEpisode = this.meeting.episodes[eLength - 1];
    if (!lastEpisode.endTime) {
      this.meeting.endTime = new Date();
      lastEpisode.endTime = this.meeting.endTime;
    } else {
      this.meeting.endTime = lastEpisode.endTime;
    }
    this.meetingInProgress = false;
    
    // this.dataService.updateMeeting(this.meeting);
  }
  
  private calculateBurnedAmount(): BurnData {
    const rate = this.meeting.people.reduce((amount, person) => {
      return amount + (person.rate/60/60/10);
    }, this.burnedAmount.rate);
    const salary = this.meeting.people.reduce((amount, person) => {
      return amount + (person.salary/265/8/60/60/10);
    }, this.burnedAmount.salary);
    const time = this.burnedAmount.time + 100
    return new BurnData (rate, salary, time);
  }
  
  private getReconstructedBurnData(meeting: Meeting): BurnData {
    // TODO: Reconstruct burn data from saved meeting info
    return new BurnData(0,0,0);
  }
  
  private startTimer() {
    this.timer = setInterval(() => {
      this.burnedAmount = this.calculateBurnedAmount();
      this.burnedAmountSubject.next(this.burnedAmount[this.mode]);
      this.wastedTimeSubject.next(this.burnedAmount.time);
    }, 100);
  }
  
  private pauseTimer() {
    clearInterval(this.timer);
  }
}
