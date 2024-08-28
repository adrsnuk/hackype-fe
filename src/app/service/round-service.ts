import { Injectable } from '@angular/core';
import { RoundHttpClient } from '../http/round-http-service';
import { ProgressService } from './progress-service';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  charsToType: string[] = [];
  currentPosition = 0;

  constructor(private roundHttpClient: RoundHttpClient) {
    roundHttpClient.textToTypeSubject.subscribe((roundContent: string) => {
      this.charsToType = roundContent.split('');
      this.currentPosition = 0;
    }
    );
  }

  evaluatePressedKey(key: string) {
    const toType = this.charsToType.at(this.currentPosition)!;

    if (key === 'Enter') {
      this.handleNewLine(toType);
    } else if (key === '.' && this.isEndOfSentence(toType)) {
      this.handleEndOfSentence();
    } else if (key == toType) {
      this.currentPosition++;
    }
  }

  handleEndOfSentence() {
    this.roundHttpClient.completeRound()
  }

  handleNewLine(toType: string) {
    if (toType === '\n') {
      this.currentPosition++;
    }
  }

  isNewLine(char: string): boolean {
    return char === '\n';
  }

  private isEndOfSentence(toType: string | undefined) {
    return (
      toType === '.' && this.charsToType.length === this.currentPosition + 1
    );
  }

}
