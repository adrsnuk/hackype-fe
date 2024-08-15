import { Injectable } from "@angular/core";
import { RoundService } from "./round-service";
import { RoundHttpClient } from "../http/round-http-service";
import { Subject } from "rxjs";
import { TooltipDirective } from "../dictionary-tooltip/dictionary-tooltip.directive";

@Injectable({
    providedIn: 'root',
})

export class DictionaryService {

    hoveredWordSubject: Subject<string> = new Subject();
    indexToWordMap: Map<number, string> = new Map<number, string>();

    constructor(private roundHttpClient: RoundHttpClient) {

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
        });

    }

    hoveredWord(index: number) {
        return this.indexToWordMap.get(index);
    }

}