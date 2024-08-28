import { Injectable } from "@angular/core";
import { RoundHttpClient } from "../http/round-http-service";
import { forkJoin, map, Observable, Subject } from "rxjs";
import { DictionaryHttpClient } from "../http/dictionary-http-service";

@Injectable({
    providedIn: 'root',
})

export class DictionaryService {

    indexToWordMap: Map<number, string> = new Map<number, string>();
    wordSet: Set<string> = new Set<string>;
    wordToDefinitionsMap: Map<string, string[]> = new Map<string, string[]>();

    constructor(private roundHttpClient: RoundHttpClient,
        private dictionaryHttpClient: DictionaryHttpClient
    ) {

        roundHttpClient.textToTypeSubject.subscribe((roundContent: string) => {

            let charsToType: string[] = roundContent.split('');

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
                    word = word.concat(currentChar!);
                }

                index++;
            }

            indexArray.forEach(passedIndex => {
                this.indexToWordMap.set(passedIndex, word);
            })

            console.log(this.indexToWordMap);

            const words = Array.from(this.wordSet);
            const requests: Observable<[string, string[]]>[] = words.map((word) =>
                this.dictionaryHttpClient.define(word).pipe(
                    map((definitions) => [word, definitions] as [string, string[]])
                )
            );

            console.log(this.wordSet);
            forkJoin(requests).subscribe((results) => {
                results.forEach(([word, definitions]) => {
                    this.wordToDefinitionsMap.set(word, definitions);
                });
                console.log("All words processed");
            });
        });
    }

    hoveredWord(index: number) {
        console.warn(this.wordToDefinitionsMap);
        return this.wordToDefinitionsMap.get(this.indexToWordMap.get(index)!)!.join("\n");
    }

}