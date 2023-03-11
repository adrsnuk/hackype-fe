import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextToTypeService {
  textToTypeLocation : string = 'assets/intro.txt';
  textTypedLocation : string = 'assets/typed.txt';
  textToTypeSubject: Subject<string> = new Subject();
  textTypedSubject: Subject<string> = new Subject();

  constructor(private http: HttpClient) {
    this.fetchTextFromFile(this.textToTypeLocation, this.textToTypeSubject);
  }

  

  private fetchTextFromFile(fileLocation: string, subject: Subject<string>) {
    this.http.get(fileLocation, { responseType: 'text' })
      .subscribe(data => {
        subject.next(data);
        subject.complete;
      });
  }
}
