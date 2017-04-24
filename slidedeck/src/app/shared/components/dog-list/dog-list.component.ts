import { Component, OnInit } from '@angular/core';

import { Dog } from './dog';

@Component({
  selector: 'opi-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})
export class DogListComponent implements OnInit {
  dogs: Dog[];
  constructor() { }

  ngOnInit() {
    this.dogs = [
      new Dog({ name: 'Bear', breed: 'Collie', age: 4 }),
      new Dog({ name: 'Wren', breed: 'Terrier', age: 2 }),
      new Dog({ name: 'Cosmo', breed: 'Bulldog', age: 8 })
    ];
  }

}
