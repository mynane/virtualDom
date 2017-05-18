import Animate from './example';

class Dog extends Animate {
  constructor(name) {
    super(name);
    this.a = 123;
  }

  b() {
    return this.b;
  }
}

const dog = new Dog('jak');
dog.say();
