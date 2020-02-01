import curry, { curry3, curry4 } from '../curry';

describe('curry', () => {
  it('Should curry a sum function', () => {
    const sum = (a: number, b: number) => a + b;
    const sum10 = curry(sum)(10);

    expect(sum10(10)).toBe(20);
  });

  it('Should curry a 3-arity function', () => {
    const sum = (a: number, b: number, c: number) => a + b + c;
    const csum = curry3(sum);

    expect(csum(1)(2)(3)).toBe(sum(1, 2, 3));
  });

  it('Should curry a 4-arity function', () => {
    const sum = (a: number, b: number, c: number, d: number) => a + b + c + d;
    const csum = curry4(sum);

    expect(csum(1)(2)(3)(4)).toBe(sum(1, 2, 3, 4));
  });
});
