import { liftPN } from '../lift';

describe('liftPN', () => {
  const printAdd = (x: number, y: number, z: number, prefix: string) => `${prefix}${x + y + z}`;

  it('Should resolve all promises and lift the function successfully', async () => {
    const get1 = () => Promise.resolve(1);
    const get2 = () => Promise.resolve(2);
    const get3 = () => Promise.resolve(3);
    const getPrefix = () => Promise.resolve('~> ');

    const res = await liftPN(printAdd, get1, get2, get3, getPrefix);
    expect(res).toBe('~> 6');
  });

  it('Should propagate error if it occurs', async () => {
    const get1 = () => Promise.resolve(1);
    const get2 = () => Promise.resolve(2);
    const get3 = () => Promise.reject(new Error('Could not get 3'));
    const getPrefix = () => Promise.resolve('~> ');

    const res = await liftPN(printAdd, get1, get2, get3, getPrefix);
    expect(res).toBeInstanceOf(Error);
    expect((res as Error).message).toBe('Could not get 3');
  });

  it('Should propagate error if some action return any error', async () => {
    const get1 = () => Promise.resolve(1);
    const get2 = () => Promise.resolve(new Error('Unexpected'));
    const get3 = () => Promise.reject(new Error('Ooops'));
    const getPrefix = () => Promise.resolve('~> ');

    const res = await liftPN(printAdd, get1, get2, get3, getPrefix);
    expect(res).toBeInstanceOf(Error);
    expect((res as Error).message).toBe('Unexpected');
  });
});
