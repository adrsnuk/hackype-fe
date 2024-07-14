import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Intro } from '../domain/Intro';
import { Round } from '../domain/Round.model';
import { UserProgress } from '../domain/UserProgress.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  textToTypeSubject: Subject<string> = new Subject();

  constructor(private http: HttpClient) {
    this.getCurrentRound();
  }

  getCurrentRound() {
    this.http
    .get<Round>('http://localhost:8080/current-round')
    .subscribe((currentRound) => {
      console.warn(currentRound.content);
      this.textToTypeSubject.next(currentRound.content);
    })
  }

  completeRound() {
    this.http
      .patch<UserProgress>('http://localhost:8080/complete-round', null)
      .subscribe((userProgress) => {
        console.warn(userProgress);
        this.getCurrentRound();
      });
  }

}
