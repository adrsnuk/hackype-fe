import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DictionaryTooltipComponent } from './dictionary-tooltip/dictionary-tooltip.component';
import { AppComponent } from './app.component';
import { TooltipDirective } from './dictionary-tooltip/dictionary-tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    DictionaryTooltipComponent,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
