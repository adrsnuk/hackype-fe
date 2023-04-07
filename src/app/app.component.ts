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
    const untyped = basic + 'text-gray-900 ';
    const typed = basic + 'text-yellow-400 bg-green-300';
    return this.sentenceService.currentPosition > i ? typed : untyped;
  }
}
