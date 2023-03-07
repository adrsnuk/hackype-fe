import { Component, HostListener, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'hackype';
  
  pressedKey = '';
  textToType = 'Sign in to your account';
  charsToType = this.textToType.split('');
  currentPosition = 0;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.pressedKey = event.key;
  
    this.currentPosition = (event.key == this.charsToType.at(this.currentPosition)) ? this.currentPosition+ 1 : 0;

    console.warn(this.pressedKey);
  }

  public colorTypedTest(i: number){
    const basic = "mt-6 text-center text-3xl font-bold tracking-tight ";
    const untyped = basic + "text-gray-900 ";
    const typed = basic + "text-yellow-400 bg-green-300";
    return this.currentPosition > i ? typed : untyped;
  }

  constructor(private http: HttpClient) { 
    this.http.get('assets/intro.txt', { responseType: 'text' })
          .subscribe(data => {
            this.textToType = data; 
            console.warn(this.textToType);
          });
  }


//   ngOnInit(){
//   this.httpClient.get('assets/Maze1.txt', { responseType: 'text' })
//       .subscribe(data => mazeData = data);
// }
}
