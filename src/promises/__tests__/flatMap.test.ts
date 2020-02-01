import flatMap from '../flatMap';

describe('flatMap', () => {
  it('', async () => {
    const p = () => Promise.resolve(42);
    const doubleP = (x: number) => Promise.resolve(x * 2);

    const result = await flatMap(p, doubleP);
    expect(result).toBe(84);
  });
});
