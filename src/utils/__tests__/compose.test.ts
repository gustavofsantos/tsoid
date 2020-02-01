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
  });

  it('Should print right composition', () => {
    const fn1 = (arg: unknown) => `fn1(${arg})`;
    const fn2 = (arg: unknown) => `fn2(${arg})`;
    const fn3 = (arg: unknown) => `fn3(${arg})`;
    const fn4 = (arg: unknown) => `fn4(${arg})`;

    const composed = compose(fn1, fn2, fn3, fn4);
    expect(composed(1)).toBe('fn1(fn2(fn3(fn4(1))))');
  });
});
