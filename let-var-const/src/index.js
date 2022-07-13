import Student, { promote } from "./student";
//  Default -> import ... from '';
// Named -> import { ... } from '';

const glenn = new Student("Glenn", "Mastering React");
console.log("glenn", glenn);
glenn.job();