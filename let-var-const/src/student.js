import { Person } from "./person";

export function promote() {}

export default class Student extends Person {
    constructor(name, degree){
      super(name);
      this.degree = degree;
    }
  
    job() {
      console.log("learn");
    }
  }