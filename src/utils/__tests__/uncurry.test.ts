import curry from '../curry';
import uncurry from '../uncurry';

describe('uncurry', () => {
  it('Curried and uncurried functions should return the same value', () => {
    const sum = (a: number, b: number) => a + b;

    const curriedSum = curry(sum);
    const uncurriedSum = uncurry(curriedSum);

    expect(curriedSum(1)(2)).toBe(uncurriedSum(1, 2));
  })
});
