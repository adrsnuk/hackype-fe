import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgressService } from '../service/progress-service';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html'
})
export class ProgressComponent implements OnInit {
    progressData = {
        currentRound: 0,
        totalRounds: 0,
        percentCompleted: 0
    };

    constructor(private http: HttpClient) {

    }

    ngOnInit(): void {
        this.fetchProgress();
    }

    fetchProgress(): void {
        this.http.get<any>('http://localhost:8080/status')
            .subscribe(data => {
                this.progressData = data;
            }, error => {
                console.error('Error fetching progress data:', error);
            });
    }
}
