import flip, { flip3 } from '../flip';

describe('flip', () => {
  it('Flip a function should return the same value', () => {
    const fn = (a: number, b: number) => a / b;

    const flipped = flip(fn);

    expect(fn(5, 2)).toBe(flipped(2, 5));
  });

  it('Flip and unflipped functions should return the same value', () => {
    const fn = (a: number, b: number, c: number) => a * b / c;

    const flipped = flip3(fn);
    expect(fn(2, 3, 4)).toBe(flipped(4, 3, 2));
  })
});
