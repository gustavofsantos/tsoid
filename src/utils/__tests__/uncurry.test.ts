import curry, { curry3, curry4 } from '../curry';
import uncurry, { uncurry3, uncurry4 } from '../uncurry';

describe('uncurry', () => {
  it('Curried and uncurried functions should return the same value', () => {
    const sum = (a: number, b: number) => a + b;

    const curriedSum = curry(sum);
    const uncurriedSum = uncurry(curriedSum);

    expect(curriedSum(1)(2)).toBe(uncurriedSum(1, 2));
  });

  it('Uncurry to 3-arity function', () => {
    const sum = (a: number, b: number, c: number) => a + b + c;

    const curriedSum = curry3(sum);
    const uncurriedSum = uncurry3(curriedSum);

    expect(curriedSum(1)(2)(3)).toBe(uncurriedSum(1, 2, 3));
  });

  it('Uncurry to 4-arity function', () => {
    const sum = (a: number, b: number, c: number, d: number) => a + b + c + d;

    const curriedSum = curry4(sum);
    const uncurriedSum = uncurry4(curriedSum);

    expect(curriedSum(1)(2)(3)(4)).toBe(uncurriedSum(1, 2, 3, 4));
  });
});
