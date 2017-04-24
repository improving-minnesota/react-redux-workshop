import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonComponent,
  DisplayDateComponent,
  DogListComponent,
  ObservableComponent,
  UpperLowerComponent
} from './components/';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonComponent,    
    DisplayDateComponent,
    DogListComponent,
    ObservableComponent,
    UpperLowerComponent
  ],
  exports: [
    ButtonComponent,    
    DisplayDateComponent,
    DogListComponent,
    ObservableComponent,
    UpperLowerComponent
  ]
})
export class SharedModule { }
