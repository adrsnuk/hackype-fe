import { Component, HostListener } from '@angular/core';

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
}
