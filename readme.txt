1️⃣ What is the difference between var, let, and const?

var, let, and const are all used to declare variables in JavaScript. 

    var is function-scoped, can be redeclared

    let is block-scoped, cannot be redeclared in the same scope
 
    const is also block-scoped but must be assigned a value at declaration and cannot be reassigned later.

2️⃣ What is the spread operator (...)?

It is used to expand elements of an object into individual parts. For arrays, it helps copy or merge them easily


3️⃣ What is the difference between map(), filter(), and forEach()?

map() goes through each element and returns a new array, can be used to transform arrays in a bulk

forEach() loops through each element to do something

filter() checks each element against a condition and returns a new array

4️⃣ What is an arrow function?

shorter way to write function

example:
*A Normal function

function add(a, b) {
  return a + b;
}

*Same Arrow function
const add = (a, b) => a + b;

5️⃣ What are template literals?

 strings written with backticks (`) instead of quotes, helps to add variable inside.
 
 example:
 const name = "Asif";
 const message = `Hello, ${name}! 

    will show : Hello, Asif!