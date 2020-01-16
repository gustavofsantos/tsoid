import { compose } from "../../index";

describe('compose', () => {
  const fn1 = (val: string) => `fn1(${val})`;
  const fn2 = (val: string) => `fn2(${val})`;
  const fn3 = (val: string) => `fn3(${val})`;
  const fn4 = (val: string) => `fn4(${val})`;
  const fn5 = (val: string) => `fn5(${val})`;

  it('compose', () => {
    const fn = compose<string>(fn1, fn2, fn3, fn4, fn5);
    const result = fn('value');

    expect(result).toBe('fn1(fn2(fn3(fn4(fn5(value)))))');
  })
})
