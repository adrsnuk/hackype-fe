import { Injectable } from "@angular/core";
import { RoundHttpClient } from "../http/round-http-service";
import { Round } from "../domain/Round.model";
import { WordDefinition } from "../domain/WordDefinition.model";

@Injectable({
    providedIn: 'root',
})

export class DictionaryService {

    indexToWordMap: Map<number, string> = new Map<number, string>();
    wordSet: Set<string> = new Set<string>;
    wordToDefinitionsMap: Map<string, string[]> = new Map<string, string[]>();

    constructor(private roundHttpClient: RoundHttpClient) {

        roundHttpClient.textToTypeSubject.subscribe((round: Round) => {

            let charsToType: string[] = round.content.split('');

            let index: number = 0;
            let word: string = '';
            let indexArray: number[] = [];


            while (index < charsToType.length) {
                let currentChar = charsToType.at(index);

                if (!currentChar?.match(/[a-z]/i)) {
                    indexArray.forEach(passedIndex => {
                        this.indexToWordMap.set(passedIndex, word);
                    })

                    this.wordSet.add(word);
                    word = '';
                    indexArray = [];

                } else {
                    indexArray.push(index);
                    word = word.concat(currentChar!.toLocaleLowerCase());
                }

                index++;
            }

            indexArray.forEach(passedIndex => {
                this.indexToWordMap.set(passedIndex, word);
            })

            console.log(this.indexToWordMap);
            console.log(this.wordSet);

            round.definitions.forEach((workDefinition: WordDefinition) => {
                this.wordToDefinitionsMap.set(workDefinition.word, workDefinition.definitions);
            })

        });
    }

    hoveredWord(index: number) {
        console.warn(this.wordToDefinitionsMap);
        return this.wordToDefinitionsMap.get(this.indexToWordMap.get(index)!)!.join("\n");
    }

}