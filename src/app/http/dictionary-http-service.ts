import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class DictionaryHttpClient {
    dictionaryUrl: String = "http://localhost:8081";

    constructor(private http: HttpClient) { }

    define(wordToDefine: string): Observable<string[]> {
        return this.http.get<string[]>(this.dictionaryUrl + '/define/' + wordToDefine).pipe(
            catchError(() => {
                console.error(`Failed to fetch definitions for ${wordToDefine}`);
                return [[]]; // Return an empty array on error
            })
        );

    }
}
