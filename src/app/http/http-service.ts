import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Intro } from '../domain/Intro';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  textToTypeLocation: string = 'assets/intro.txt';
  textToTypeSubject: Subject<string> = new Subject();
  currentSentenceSubject: Subject<number> = new Subject();

  constructor(private http: HttpClient) {
    this.fetchTextFromFile();
  }

  fetchTextFromFile() {
    this.http
      .get(this.textToTypeLocation, { responseType: 'text' })
      .subscribe((data) => {
        this.http
          .get('http://localhost:8080/current-sentence')
          .subscribe((currentSentence) => {
            this.currentSentenceSubject.next(+currentSentence);
            this.currentSentenceSubject.complete;
            this.textToTypeSubject.next(data);
            this.textToTypeSubject.complete;
          });
      });
  }

  completeSentence(id: number, sentence: string) {
    let intro = new Intro(id, sentence);
    console.warn(intro);

    this.http
      .post('http://localhost:8080/complete-sentence', intro)
      .subscribe();
  }
}
