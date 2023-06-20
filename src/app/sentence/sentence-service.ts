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
    // Test mode
    // this.currentSentence = 0;
    // this.sentences = ['1.\n1', '2', '3', '4'];

    this.sentences = text.split('. ');

    // Recovery mode
    // for (let i = 0; i < 55; i++) {
    //   this.httpService.completeSentence(i + 1, this.sentences[i]);
    // }

    this.charsToType = this.splitSentenceToType();
  }

  evaluatePressedKey(key: string) {
    const toType = this.charToType();

    if (key === 'Enter') {
      this.handleNewLine(toType);
    } else if (key === '.' && this.endOfSentence(toType)) {
      this.handleEndOfSentence(toType);
    } else if (key == this.charToType()) {
      this.currentPosition++;
    } else {
      // Hardcore mode
      // this.currentPosition = 0;
    }
  }

  handleEndOfSentence(toType: string | undefined) {
    this.postCompletedSentence();
    this.goToNextSencente();
    this.currentPosition = 0;
  }

  private postCompletedSentence() {
    const id = this.currentSentence;
    const sentence = this.sentences.at(id)!;
    this.httpService.completeSentence(id, sentence);
  }

  splitSentenceToType(): string[] {
    return this.sentences.at(this.currentSentence)?.concat('.')!.split('')!;
  }

  handleNewLine(toType: string) {
    if (toType === '\n') {
      this.currentPosition++;
    } else {
      this.currentPosition = 0;
    }
  }

  isNewLine(char: string): boolean {
    return char === '\n';
  }

  charToType() {
    return this.charsToType.at(this.currentPosition)!;
  }

  private endOfSentence(toType: string | undefined) {
    return (
      toType === '.' && this.charsToType.length === this.currentPosition + 1
    );
  }

  private goToNextSencente() {
    console.warn('Next sentence');
    this.currentSentence = this.currentSentence + 1;

    if (this.sentences.length === this.currentSentence) {
      this.sentences.push('Congratulations the intro is complete!');
    }

    this.charsToType = this.splitSentenceToType();
  }
}
