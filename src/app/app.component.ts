import { Component, HostListener, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http/http-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'hackype';

  pressedKey = '';
  textToType: string = '';
  charsToType: string[] = this.textToType.split('');
  currentPosition = 0;
  sentances: string[] = [];
  currentSentance: number = 0;

  constructor(private httpService: HttpService) {
    httpService.currentSentenceSubject.subscribe(currentSentence => this.currentSentance = currentSentence);
    httpService.textToTypeSubject.subscribe(text => this.prepareTextToType(text));
  }

  public prepareTextToType(text: string): void {
    this.sentances = text.split(". ");
    this.charsToType = this.sentances.at(this.currentSentance)?.concat(".").split('')!;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.pressedKey = event.key;

    this.currentPosition = this.evaluateKeyPressed(event);

    // console.warn(this.pressedKey);
  }

  evaluateKeyPressed(event: KeyboardEvent): number {
    const toType = this.charsToType.at(this.currentPosition);

    if (event.key === 'Enter') {
      if (toType === '\n') {
        return this.currentPosition + 1;
      }
      else {
        return 0;
      }
    }

    if(event.key === '.'){
      if(this.endOfSentence(toType)){
        console.warn('should save sentance'); 
        console.warn('shoul get new sentence');
        this.currentPosition = 0;
      }
    }

    return (event.key == this.charsToType.at(this.currentPosition)) ? this.currentPosition + 1 : 0;
  }

  endOfSentence(toType: string | undefined) {
    return (toType === '.') && (this.charsToType.length === this.currentPosition + 1);
  }

  colorTypedTest(i: number) {
    const basic = "mt-6 text-center text-3xl font-bold tracking-tight ";
    const untyped = basic + "text-gray-900 ";
    const typed = basic + "text-yellow-400 bg-green-300";
    return this.currentPosition > i ? typed : untyped;
  }

  isNewLine(char: string): any {
    return char === '\n';
  }
}
