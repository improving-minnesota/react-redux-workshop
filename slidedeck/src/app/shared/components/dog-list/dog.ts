export interface IDog {
  age?: number;
  breed?: string;
  name?: string;
}

export class Dog {
  private age: number;
  private breed: string;
  private name: string;
  constructor({ age, breed, name }: IDog) {
    this.age = age;
    this.breed = breed;
    this.name = name;
  }
}
