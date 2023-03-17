import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  textToTypeLocation: string = 'assets/intro.txt';
  textToTypeSubject: Subject<string> = new Subject();
  currentSentenceSubject: Subject<number> = new Subject();

  constructor(private http: HttpClient) {
    this.fetchTextFromFile();
  }

  fetchTextFromFile() {
    this.http.get(this.textToTypeLocation, { responseType: 'text' })
      .subscribe(data => {

        this.http.get('http://localhost:8080/current-sentence').subscribe(currentSentence => {
          this.currentSentenceSubject.next(+currentSentence);
          this.currentSentenceSubject.complete;
          this.textToTypeSubject.next(data);
          this.textToTypeSubject.complete;
        });
      });
  }

  completeSentence(id: number, sentence: string) {
    console.warn(`Saving sentence #${id}: ${sentence}`); 
    const params = new HttpParams();
    params.set('id', id)
    .set('sentence', sentence);
    this.http.post('http://localhost:8080/complete-sentence', {params}).subscribe({
      
    })
  }
}
