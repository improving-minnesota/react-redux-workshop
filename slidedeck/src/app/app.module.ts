import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { DynamicHTMLModule } from 'ng-dynamic';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { SlideDeckComponent } from './slide-deck/slide-deck.component';
import {
  DisplayDateComponent,
  DogListComponent,
  ObservableComponent,
  UpperLowerComponent
} from './shared/components/';

@NgModule({
  declarations: [
    AppComponent,
    SlideDeckComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    DynamicHTMLModule
      .forRoot({
        components: [
          {
            component: DisplayDateComponent,
            selector: 'opi-display-date'
          },
          {
            component: DogListComponent,
            selector: 'opi-dog-list'
          },
          {
            component: ObservableComponent,
            selector: 'opi-observable'
          },
          {
            component: UpperLowerComponent,
            selector: 'opi-upper-lower'
          }
        ]
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
