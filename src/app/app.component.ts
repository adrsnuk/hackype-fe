import { Component, HostListener, Injectable, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TextToTypeService } from './text_to_type/text_to_type_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'hackype';

  pressedKey = '';
  textToType: string = 'Sign in to your account';
  charsToType: string[] = this.textToType.split('');
  currentPosition = 0;
  sentances: string[] = [];
  currentSentance: number = 0;

  // fetchTextToTypeService: FetchTextToTypeService;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.pressedKey = event.key;

    this.currentPosition = this.evaluateKeyPressed(event);

    // console.warn(this.pressedKey);
  }

  private evaluateKeyPressed(event: KeyboardEvent): number {
    const toType = this.charsToType.at(this.currentPosition);

    if (event.key === 'Enter') {
      if (toType === '\n') {
        return this.currentPosition + 1;
      }
      else {
        return 0;
      }
    }

    return (event.key == this.charsToType.at(this.currentPosition)) ? this.currentPosition + 1 : 0;
  }

  public colorTypedTest(i: number) {
    const basic = "mt-6 text-center text-3xl font-bold tracking-tight ";
    const untyped = basic + "text-gray-900 ";
    const typed = basic + "text-yellow-400 bg-green-300";
    return this.currentPosition > i ? typed : untyped;
  }

  constructor(private textToTypeService: TextToTypeService, private http: HttpClient) {
    textToTypeService.textToTypeSubject.subscribe(text => this.toTextToType(text));
  }

  public toTextToType(text: string): void {
    this.sentances = text.split(". ");
    this.currentSentance = 0;
    console.warn(this.sentances.length);
    this.charsToType = this.sentances.at(0)?.split('')!;

  }

  isNewLine(char: string): any {
    return char === '\n';
  }
}
