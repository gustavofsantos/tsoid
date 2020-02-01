import { sequence } from '../../index';

describe('sequenceP', () => {
  it('Should sequence actions', async () => {
    const getTen = () => Promise.resolve(10);
    const getTwenty = () => Promise.resolve(20);

    const result = await sequence([getTen, getTwenty]);

    expect(result).toStrictEqual([10, 20]);
  });

  it('Should propagate error', async () => {
    const getTen = () => Promise.resolve(10);
    const getTwenty = () => Promise.reject(new Error('Fail to get twenty'));

    const result = await sequence([getTen, getTwenty]);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('Fail to get twenty');
  });
});
