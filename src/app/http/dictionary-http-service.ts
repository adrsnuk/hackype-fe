import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class DictionaryHttpClient {

    constructor(private http: HttpClient) { }

    define(wordToDefine: string): Observable<string[]> {
        return this.http.get<string[]>('http://localhost:8081/define/' + wordToDefine).pipe(
            catchError(() => {
                console.error(`Failed to fetch definitions for ${wordToDefine}`);
                return [[]]; // Return an empty array on error
            })
        );

    }
}
