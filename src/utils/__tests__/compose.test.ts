import compose from '../compose';

describe('compose', () => {
  const double = (x: number) => x * 2;
  const triple = (x: number) => x * 3;
  const isEven = (x: number) => x % 2 === 0;

  it('Composing three functions should return the right value', () => {
    const fn = compose(isEven, double, triple);
    expect(fn(3)).toBe(true);
  });

  it('Composing two functon should return the right value', () => {
    const fn = compose(isEven, triple);
    expect(fn(3)).toBe(false);
  })
});
