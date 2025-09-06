import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Round } from '../domain/Round.model';
import { UserProgress } from '../domain/UserProgress.model';

@Injectable({
  providedIn: 'root',
})
export class RoundHttpClient {
  textToTypeSubject: Subject<Round> = new Subject();
  hackypeBeUrl: String = "https://hackype-be-bulk-production.up.railway.app";

  constructor(private http: HttpClient) {
    this.getCurrentRound();
  }

  getCurrentRound() {
    this.http
      .get<Round>(this.hackypeBeUrl + '/current-round')
      .subscribe((currentRound) => {
        console.warn(currentRound);
        this.textToTypeSubject.next(currentRound);
      })
  }

  completeRound() {
    this.http
      .patch<UserProgress>(this.hackypeBeUrl + "/complete-round", null)
      .subscribe((userProgress) => {
        console.warn(userProgress);
        this.getCurrentRound();
      });
  }

}
