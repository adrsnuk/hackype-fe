import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class DictionaryHttpClient {
    dictionaryUrl: String = "https://dictionary-production-2b41.up.railway.app";

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
