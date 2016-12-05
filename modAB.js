export class A {



  constructor(){

    this.x = 122;

  }

  show(){
    console.log("A says:", this.x);
  }


}

export class B {

  constructor(data = {}) {
    this.y = data.y | 0;
  }

  show(){
    console.log("B says:", this.y);
  }
}

