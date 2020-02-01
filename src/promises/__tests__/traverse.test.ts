import { traverse } from '../../index';

describe('traverse', () => {
  const list = [1, 2, 3, 4, 5];
  const decideIfIsEven = jest.fn((n: number) => Promise.resolve(n % 2 === 0));

  it('Should apply the action to all traversable items', async () => {
    const res = await traverse(list, decideIfIsEven);

    expect(res).toStrictEqual([false, true, false, true, false]);
    expect(decideIfIsEven).toBeCalledTimes(list.length);
  });

  it('Should propagate the error', async () => {
    const fn = (n: number) => (n % 2 === 0 ? Promise.reject(new Error('Is EVEN!')) : Promise.resolve(false));

    const res = await traverse(list, fn);
    expect(res).toBeInstanceOf(Error);
    expect((res as Error).message).toBe('Is EVEN!');
  });
});
