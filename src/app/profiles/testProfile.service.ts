import { Injectable } from '@angular/core';
import { HttpService } from '../http/http-service';

@Injectable({
  providedIn: 'root',
})
export class TestProfile {
  charsToType: string[] = [];
  currentPosition = 0;
  sentences: string[] = [];
  currentSentence: number = 0;

  constructor() {}

  prepareTextToType(text: string): void {
    // Test mode
    this.currentSentence = 0;
    this.sentences = ['1.\n1', '2', '3', '4'];
    this.charsToType = this.splitSentenceToType();
  }

  handleEndOfSentence(toType: string | undefined) {
    this.goToNextSencente();
    this.currentPosition = 0;
  }

  private goToNextSencente() {
    console.warn('Next sentence');
    this.currentSentence = this.currentSentence + 1;

    if (this.sentences.length === this.currentSentence) {
      this.sentences.push('Congratulations the intro is complete!');
    }

    this.charsToType = this.splitSentenceToType();
  }

  splitSentenceToType(): string[] {
    return this.sentences.at(this.currentSentence)?.concat('.')!.split('')!;
  }
}
