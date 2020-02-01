import flip, { flip3, flip4 } from '../flip';

describe('flip', () => {
  it('Flip a function should return the same value', () => {
    const fn = (a: number, b: number) => a / b;

    const flipped = flip(fn);

    expect(fn(5, 2)).toBe(flipped(2, 5));
  });

  it('Flip and unflipped functions should return the same value', () => {
    // eslint-disable-next-line no-mixed-operators
    const fn = (a: number, b: number, c: number) => (a * b) / c;

    const flipped = flip3(fn);
    expect(fn(2, 3, 4)).toBe(flipped(4, 3, 2));
  });

  it('Flip and unflipped function should return the same value', () => {
    // eslint-disable-next-line no-mixed-operators
    const fn = (a: number, b: number, c: number, d: number) => ((a * b) / c) * d;
    const flipped = flip4(fn);
    expect(fn(2, 3, 4, 5)).toBe(flipped(5, 4, 3, 2));
  });
});
