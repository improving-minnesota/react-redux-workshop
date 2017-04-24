import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'opi-display-date',
  templateUrl: './display-date.component.html',
  styleUrls: ['./display-date.component.scss']
})
export class DisplayDateComponent implements OnDestroy, OnInit {
  @Input()
  public format: string = 'medium';

  private now: number;
  private interval: any;

  constructor() {}

  setFormat(format: string) {
    this.format = format;
  }

  ngOnInit() {
    this.now = Date.now();
    this.interval = setInterval(() => {
      this.now = Date.now();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
