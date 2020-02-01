import { map } from '../../index';

describe('map', () => {
  const ls = [1, 2, 3];

  it('Should map over future values', async () => {
    const add1P = (x: number) => Promise.resolve(x + 1);

    const result = await map(add1P, ls);
    expect(result).toStrictEqual([2, 3, 4]);
  });

  it('Should propagate errors', async () => {
    const maybeAdd = (x: number) => (x === 2 ? Promise.reject(new Error('Invalid number!')) : Promise.resolve(x + 1));

    const result = await map(maybeAdd, ls);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('Invalid number!');
  });
});
