import flatMap from '../flatMap';

describe('flatMap', () => {
  it('Should flat a promise and apply the mapper function successfully', async () => {
    const p = () => Promise.resolve(42);
    const doubleP = (x: number) => Promise.resolve(x * 2);

    const result = await flatMap(p, doubleP);
    expect(result).toBe(84);
  });

  it('Should propagate error if it occurs', async () => {
    const p = () => Promise.reject(new Error('Could not resolve the promise'));
    const doubleP = (x: number) => Promise.resolve(x * 2);

    const result = await flatMap(p, doubleP);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('Could not resolve the promise');
  });
});
