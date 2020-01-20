# Tsoid

Typed functional library to deal with async operations.

### Motivation

When you put a value into a Promise, it is impossible to get the value out

### Getting Started

### Documentation

#### Promise based functions

##### pure

Lift a value into a resolved Promise.

Example:

```javascript
pure(42); // Promise(42)
```

##### fail



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

##### replicate

##### sequence

##### traverse

##### lift

##### flatMap

##### bind

##### exec

#### Utilities

This module contains a serie of utility functions.

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

##### uncurry

##### compose

##### pipe