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
    this.sentences = text.split('. ');
    this.charsToType = this.splitSentenceToType();
  }

  splitSentenceToType(): string[] {
    return this.sentences.at(this.currentSentence)?.concat('.')!.split('')!;
  }

  handleNewLine(toType: string) {
    if (this.isNewLine(toType)) {
      return this.currentPosition + 1;
    } else {
      return 0;
    }
  }

  isNewLine(char: string): any {
    return char === '\n';
  }

  charToType() {
    return this.charsToType.at(this.currentPosition)!;
  }

  handleEndOfSentence(toType: string | undefined) {
    if (this.endOfSentence(toType)) {
      this.postCompletedSentence();
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
}
