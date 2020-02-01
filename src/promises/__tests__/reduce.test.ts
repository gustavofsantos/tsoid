import { reduce } from '../../index';

describe('reduce', () => {
  const add = (x: number, y: number) => Promise.resolve(x + y);
  const list = [1, 2, 3, 4, 5];

  it('Should reduce a list of numbers', async () => {
    const result = await reduce(add, 0, list);

    expect(result).toBe(15);
  });
});
