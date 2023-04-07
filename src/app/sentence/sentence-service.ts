import { Injectable } from '@angular/core';
import { HttpService } from '../http/http-service';

@Injectable({
  providedIn: 'root',
})
export class SententService {
  charsToType: string[] = [];
  currentPosition = 0;
  sentences: string[] = [];
  currentSentence: number = 0;

  constructor(private httpService: HttpService) {
    httpService.currentSentenceSubject.subscribe(
      (currentSentence) => (this.currentSentence = currentSentence)
    );
    httpService.textToTypeSubject.subscribe((text) =>
      this.prepareTextToType(text)
    );
  }

  prepareTextToType(text: string): void {
    // this.sentences = text.split('. ');
    this.currentSentence = 0; // Test mode!
    this.sentences = ['1\n1', '2', '3', '4'];
    this.charsToType = this.splitSentenceToType();
  }

  splitSentenceToType(): string[] {
    return this.sentences.at(this.currentSentence)?.concat('.')!.split('')!;
  }

  handleNewLine(toType: string): number {
    if (toType === '\n') {
      return this.currentPosition + 1;
    } else {
      return 0;
    }
  }

  isNewLine(char: string): boolean {
    return char === '\n';
  }

  charToType() {
    return this.charsToType.at(this.currentPosition)!;
  }

  handleEndOfSentence(toType: string | undefined) {
    if (this.endOfSentence(toType)) {
      // this.postCompletedSentence();
      this.goToNextSencente();
      this.currentPosition = 0;
    }
  }

  private endOfSentence(toType: string | undefined) {
    return (
      toType === '.' && this.charsToType.length === this.currentPosition + 1
    );
  }

  private postCompletedSentence() {
    const id = this.currentSentence;
    const sentence = this.sentences.at(id)!;
    this.httpService.completeSentence(id, sentence);
  }

  private goToNextSencente() {
    console.warn('Next sentence');
    this.currentSentence = this.currentSentence + 1;

    if (this.sentences.length === this.currentSentence) {
      this.sentences.push('Congratulations the intro is complete!');
    }

    this.charsToType = this.splitSentenceToType();
  }

  evaluatePressedKey(key: string) {
    this.currentPosition = this.evaluateKeyPressed(key);
  }

  evaluateKeyPressed(key: string): number {
    const toType = this.charToType();

    if (key === 'Enter') {
      return this.handleNewLine(toType);
    }

    if (key === '.') {
      this.handleEndOfSentence(toType);
    }

    if (key == this.charToType()) {
      return this.currentPosition + 1;
    } else {
      return 0;
    }
  }
}
