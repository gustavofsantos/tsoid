import curry from '../curry';

describe('curry', () => {
  it('Should curry a sum function', () => {
    const sum = (a: number, b: number) => a + b;
    const sum10 = curry(sum)(10);

    expect(sum10(10)).toBe(20);
  });
});
