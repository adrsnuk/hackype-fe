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

  constructor(public sentenceService: SententService) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let pressedKey = event.key;
    this.sentenceService.evaluatePressedKey(pressedKey);
  }

  colorTypedTest(i: number) {
    const basic = 'mt-6 text-center text-3xl font-bold tracking-tight ';
    const untyped = basic + 'text-gray-700 ';
    const next = basic + 'text-gray-700 underline decoration-yellow-400';
    const typed = basic + 'text-yellow-400';

    const position = this.sentenceService.currentPosition;

    if (position > i) {
      return typed;
    } else if (position == i) {
      return next;
    } else {
      return untyped;
    }
  }
}
