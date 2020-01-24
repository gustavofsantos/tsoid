# Tsoid

Typed functional library to deal with async operations.

### Getting Started

Install using npm:

```sh
npm install tsoid
```

### Documentation

#### Promise based functions

##### pure

Lift a value into a resolved Promise.

Example:

```javascript
pure(42); // Promise(42)
```

##### fail

Helper function that receives an string or an instance of Error and return an Promise of Error.

Example:

```javascript
fail('This is an error'); // Promise(Error('This is an error));
```

##### when

Execute the action if the condition is `true`.

Example:

```javascript
const printOk = () => Promise.resolve(console.log('Ok'));

when(true, printOk); // Ok
when(false, printOk); //
```

##### unless

Is the opposite of `when`.

##### either

Given two callback functions and a Promise that can resolve to an Error instance,
it calls the first callback passing the promise result if the result is no an Error or
it calls the second callback passing the promise result if the result is an instance
of Error.

##### map

For a given action function and a list of values, applies the function to each element of the array, waits for each result and return a list of results.

Example:

```javascript
const getUser = (id) => Promise.resolve({ id, user: 'User' });

map(getUser, [1, 2, 3]); // Promise([ { id: 1, user: "User"}, { id: 2, user: "User" }, ... ])
```

##### filter

For a given predicate action function and a list of values, applies the predicate
function to each element of the array, and return a list of all values that satisfies
the predicate action function.

Example:

```javascript
const userExist = (id) => Promise.resolve([1, 3].includes(id));

filter(userExist, [1, 2, 3]); // Promise([1, 3]);
```

##### reduce

Reduce a list of items into a single item using an async function.

Example:

```javascript
const add = (x: number, y: number) => Promise.resolve(x + y);
const list = [1, 2, 3, 4, 5];

reduce(add, 0, list); // Promise(15);
```

##### replicate

Performs the action function `n` times, gathering the results.

Example:

```javascript
const getRandom = () => Promise.resolve(Math.trunc(Math.random() * 10));

replicate(3, getRandom); // Promise([8, 3, 4])
```

##### sequence

Evaluate synchronously each promise in the list from left to right, and collect the results.

Example: 

```javascript
const getTen = () => Promise.resolve(10);
const getTwenty = () => Promise.resolve(20);

sequence([getTen(), getTwenty()]); // Promise([10, 20])
```

##### traverse

It is like the `map` function, but with the arguments flipped.

##### lift

Lift a pure function into a Promise value. 

Example:

```javascript
const future10 = Promise.resolve(10);
const isTen = (x) => x === 10;

lift(isTen, future10); // Promise(true);
```

It is also exported the functions lift2, lift3 and lift4, that resolves all the promises
then apply the n-ary function to its values.

##### flatMap

Given a Promise and a action function that depends of the value of these promise,
flatten the Promise and apply the value into the action, then await for the result.

Example: 

```javascript
const futureSelf = Promise.resolve({ name: 'Gustavo' });

const viewName = (user) => user.name;

flatMap(futureSelf, viewName); // Promise('Gustavo')
```

##### bind

Given a Promise and one or more actions, sequentially compose these actions,
passing any value produced by the first as an argument to the second and so on.
Similar to the Haskell >>= operator. 

Example:

```javascript
const initial = Promise.resolve(1);
const doubleP = (x: number) => Promise.resolve(x * 2);
const tripleP = (x: number) => Promise.resolve(x * 3);
const stringifyP = (x: number) => Promise.resolve('' + x);

bind(initial, doubleP, tripleP, stringifyP); // Promise('6')
```

##### exec

Given one or more actions, sequentially compose them, discarding any value 
produced by the first, like sequencing operators. Similar to the Haskell >> operator.

#### Utilities

This module contains a serie of utility functions that you can use.

##### id

The identity function, it returns the argument.

Example:
```javascript
const value = 40;
id(value); // 40
```

##### flip

For a given function, it return a new function that has the arguments flipped.

Example:

```javascript
const div = (n, m) => n / m;
const fdiv = flip(div);

div(4, 2); // 2
fdiv(2, 4); // 2
```

It is also exported `flip3` and `flip4` functions that has 3 and 4-arity.

##### curry

Transform a function into an static curried function.

Example:

```javascript
const add10 = curry((x, y) => x + y);
add10(10); // 20
```

It is also exported curry3 and curry4 functions that deal with function that has 3 and 4-arity.

##### uncurry

##### compose

##### pipe
