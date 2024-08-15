import { Component, HostListener, Injectable, Input } from '@angular/core';
import { RoundService } from './service/round-service';
import { DictionaryService } from './service/dictionary-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'hackype';

  constructor(
    public roundService: RoundService,
    public dictionaryService: DictionaryService) { }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let pressedKey = event.key;
    this.roundService.evaluatePressedKey(pressedKey);
  }

  colorTypedTest(i: number, char: string) {
    const basic = 'mt-6 text-center text-3xl font-bold tracking-tight ';
    const untyped = basic + 'text-gray-700 ';
    const typed = basic + 'text-green-800';

    let next = basic + 'text-yellow-400';

    if (char.trim().length == 0) {
      next = 'underline decoration-yellow-400';
    }

    const position = this.roundService.currentPosition;

    if (position > i) {
      return typed;
    } else if (position == i) {
      return next;
    } else {
      return untyped;
    }
  }

  dictionaryPopup(i: number) {
    this.dictionaryService.hoveredWord(i);
  }
}
