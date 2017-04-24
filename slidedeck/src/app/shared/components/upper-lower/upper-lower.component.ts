import { Component } from '@angular/core';

@Component({
  selector: 'opi-upper-lower',
  templateUrl: './upper-lower.component.html',
  styleUrls: ['./upper-lower.component.scss']
})
export class UpperLowerComponent {
  strValue: string = 'Hello World';

  pipe: string;

  constructor() {}

  setPipe(pipe: string) {
    this.pipe = pipe;
  }
}
