import { pipe } from '../../index';

describe('pipe', () => {
  it('Should pipe successfully', () => {
    const fn1 = (arg: unknown) => `fn1(${arg})`;
    const fn2 = (arg: unknown) => `fn2(${arg})`;
    const fn3 = (arg: unknown) => `fn3(${arg})`;
    const fn4 = (arg: unknown) => `fn4(${arg})`;

    const piped = pipe(fn1, fn2, fn3, fn4);

    expect(piped(1)).toBe('fn4(fn3(fn2(fn1(1))))');
  });
});
