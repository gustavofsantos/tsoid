import { filter } from "../../index";


describe('filterP', () => {
  const list = [1, 2, 3, 4, 5];

  it('Should filter only odds', async () => {
    const longRunningIsOdd = (x: number) => Promise.resolve(x % 2 !== 0);


    const result = await filter(longRunningIsOdd, list);

    expect(result).toStrictEqual([1, 3, 5]);
  });

  it('Should handle runtime errors', async () => {
    const shouldFailFn = (x: number) => {
      if (x === 3) {
        throw new Error('The number is 3!');
      }

      return Promise.resolve(x % 2 !== 0);
    };

    const result = await filter(shouldFailFn, list);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('The number is 3!');
  })
});
