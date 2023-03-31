import { Component, HostListener, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http/http-service';
import { SententService } from './sentence/sentence-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'hackype';

  pressedKey = '';

  constructor(public sentenceService: SententService) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.pressedKey = event.key;

    this.sentenceService.currentPosition = this.evaluateKeyPressed(event);

    // console.warn(this.pressedKey);
  }

  evaluateKeyPressed(event: KeyboardEvent): number {
    const toType = this.sentenceService.charToType();

    if (event.key === 'Enter') {
      if (toType === '\n') {
        return this.sentenceService.currentPosition + 1;
      } else {
        return 0;
      }
    }

    if (event.key === '.') {
      if (this.sentenceService.endOfSentence(toType)) {
        this.sentenceService.completeSentence();
        this.sentenceService.goToNextSencente();
        this.sentenceService.currentPosition = 0;
      }
    }

    return event.key ==
      this.sentenceService.charsToType.at(this.sentenceService.currentPosition)
      ? this.sentenceService.currentPosition + 1
      : 0;
  }

  colorTypedTest(i: number) {
    const basic = 'mt-6 text-center text-3xl font-bold tracking-tight ';
    const untyped = basic + 'text-gray-900 ';
    const typed = basic + 'text-yellow-400 bg-green-300';
    return this.sentenceService.currentPosition > i ? typed : untyped;
  }
}
