import bind from '../bind';
import safe from '../safe';

describe('bind', () => {
  it('Should bind three actions', async () => {
    const initial = Promise.resolve(1);
    const doubleP = (x: number) => Promise.resolve(x * 2);
    const tripleP = (x: number) => Promise.resolve(x * 3);
    const stringfyP = (x: number) => Promise.resolve('' + x);

    const result = await bind(initial, doubleP, tripleP, stringfyP);
    expect(result).toBe('6');
  });

  it('Should propagate failure', async () => {
    const initial = Promise.resolve(1);
    const doubleP = (x: number) => Promise.resolve(x * 2);
    const tripleP = () => Promise.reject("X is invalid!");
    const stringfyP = (x: number) => Promise.resolve('' + x);

    const result = await safe(bind, initial, doubleP, tripleP, stringfyP);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('X is invalid!');
  })
});
