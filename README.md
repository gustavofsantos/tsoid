# Tsoid

Typed functional library to deal with async operations.

![NPM Publish](https://github.com/gustavofsantos/tsoid/workflows/NPM%20Publish/badge.svg?branch=master)

---

### Getting Started

Install using npm:

```sh
npm install tsoid
```

### Documentation

The key difference is that this library self handles all errors that could be happen during the execution time. In cases that a computation of actions is composed (e.g. many actions run synchronously) if one error occur, it will be propagated till the end.

##### Promise based functions

#### pure

Lift a value into a resolved Promise.

Example:

```javascript
pure(42);
// Promise { 42 }
```

#### fail

Helper function that receives an string or an instance of Error and return an Promise of Error.

Example:

```javascript
fail('This is an error');
// Promise { Error('This is an error) };
```

#### when

Execute the action if the condition is `true`.

Example:

```javascript
const printOk = () => Promise.resolve(console.log('Ok'));

when(true, printOk); // Ok
when(false, printOk); //
```

#### unless

Is the opposite of `when`.

#### either

Given two callback functions, and a Promise that can resolve to an Error instance,
it calls the first callback passing the promise result if the result is an Error, or
it calls the second callback passing the promise result if the result is an instance
of Error.



It could act as a default function call if there's any error involved in the computation:

```javascript
const successCallback = jest.fn((n) => n + 1);
const errorCallback = jest.fn(() => 9);

const action = () => Promise.resolve(new Error('Some error'));
either(successCallback, errorCallback, action);
// Promise { 9 }
```

But, if the computation throws an Error, that is the case of `Promise.reject`,
the flow will be stopped and the error will be returned as a resolved promise.

Example:

```javascript
const successCallback = jest.fn((n) => n + 1);
const errorCallback = jest.fn(() => 9);

const action = () => Promise.reject(new Error('Some error'));
either(successCallback, errorCallback, action);
// Promise rejected { Error('Some error') };
```

#### map

For a given action function and a list of values, applies the function to each element of the array, waits for each result and return a list of results.

Example:

```javascript
const getUser = (id) => Promise.resolve({ id, user: 'User' });

map(getUser, [1, 2, 3]);
// Promise { [ { id: 1, user: "User"}, { id: 2, user: "User" }, ... ] }
```

#### filter

For a given predicate action function and a list of values, applies the predicate
function to each element of the array, and return a list of all values that satisfies
the predicate action function.

Example:

```javascript
const userExist = (id) => Promise.resolve([1, 3].includes(id));

filter(userExist, [1, 2, 3]);
// Promise { [1, 3] };
```

#### reduce

Reduce a list of items into a single item using an async function.

Example:

```javascript
const add = (x, y) => Promise.resolve(x + y);
const list = [1, 2, 3, 4, 5];

reduce(add, 0, list);
// Promise { 15 };
```

#### replicate

Performs the action function `n` times, gathering the results.

Example:

```javascript
const getRandom = () => Promise.resolve(Math.trunc(Math.random() * 10));

replicate(3, getRandom);
// Promise { [8, 3, 4] }
```

#### sequence

Evaluate synchronously each promise in the list from left to right, and collect the results.

Example: 

```javascript
const getTen = () => Promise.resolve(10);
const getTwenty = () => Promise.resolve(20);

sequence([getTen(), getTwenty()]);
// Promise { [10, 20] }
```

#### traverse

It is like the `map` function, but with the arguments flipped.

#### lift

Lift a pure function into a Promise value. 

Example:

```javascript
const future10 = Promise.resolve(10);
const isTen = (x) => x === 10;

lift(isTen, future10);
// Promise { true };
```

It is also exported the functions `liftP2`, `liftP3`, `liftP4`
and a type unsafe version called `liftPN`, that resolves all
the promises then apply the n-ary function to its values.

#### flatMap

Given a Promise and an action function that depends on the value of these promise,
flatten the Promise and apply the value into the action, then await for the result.

Example: 

```javascript
const futureSelf = Promise.resolve({ name: 'User' });
const viewName = (user) => user.name;

flatMap(futureSelf, viewName);
// Promise { 'User' }
```

#### bind

Given a Promise and one or more actions, sequentially compose these actions,
passing any value produced by the first as an argument to the second and so on.
Similar to the Haskell `>>=` operator. 

Example:

```javascript
const initial = Promise.resolve(1);
const doubleP = (x) => Promise.resolve(x * 2);
const tripleP = (x) => Promise.resolve(x * 3);
const stringifyP = (x) => Promise.resolve('' + x);

bind(initial, doubleP, tripleP, stringifyP);
// Promise { '6' }
```

#### exec

Given one or more actions, sequentially compose them, discarding any value 
produced by the first, like sequencing operators. Similar to the Haskell `>>` operator.

Example:

```javascript
const updateDatabase = async () => true;
const notifyUsers = async () => true;
const dropInstance = async () => true;

exec(updateDatabase, notifyUsers, dropInstance);
```

##### Utilities

---

This module contains a serie of utility functions that you can use.

#### id

The identity function, it returns the argument.

Example:
```javascript
const value = 40;
id(value); // 40
```

#### flip

For a given function, it return a new function that has the arguments flipped.

Example:

```javascript
const div = (n, m) => n / m;
const fdiv = flip(div);

div(4, 2); // 2
fdiv(2, 4); // 2
```

It is also exported `flip3` and `flip4` functions that has 3 and 4-arity.

#### curry

Transform a function into an static curried function.

Example:

```javascript
const add = (x, y) => x + y;
const add10 = curry(add);

add10(10); // 20
```

It is also exported `curry3` and `curry4` functions that deal with function that has 3 and 4-arity.

#### uncurry

Undo a curried function.

Example:

```javascript
const lazyAdd = (x) => (y) => x + y;
const add = uncurry(lazyAdd);

add(1, 2); // 3
```

#### compose

Compose `n` pure functions into a single function, applying from right to left.

Example:

```javascript
const fn1 = (arg) => `fn1(${arg})`;
const fn2 = (arg) => `fn2(${arg})`;
const fn3 = (arg) => `fn3(${arg})`;
const fn4 = (arg) => `fn4(${arg})`;

const composed = compose(fn1, fn2, fn3, fn4);
composed(); // fn1(fn2(fn3(fn4(1))))
```

#### pipe

Compose `n` pure functions into a single function, applying from left to right.

Example:

```javascript
const fn1 = (arg) => `fn1(${arg})`;
const fn2 = (arg) => `fn2(${arg})`;
const fn3 = (arg) => `fn3(${arg})`;
const fn4 = (arg) => `fn4(${arg})`;

const piped = pipe(fn1, fn2, fn3, fn4);
piped(1); // fn4(fn3(fn2(fn1(1))))
```
