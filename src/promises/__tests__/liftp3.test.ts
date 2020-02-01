import { liftP3 } from '../lift';

describe('liftP3', () => {
  const add3 = (x: number, y: number, z: number) => x + y + z;

  it('Should resolve all promises and lift the function successfully', async () => {
    const get1 = () => Promise.resolve(1);
    const get2 = () => Promise.resolve(2);
    const get3 = () => Promise.resolve(3);

    const res = await liftP3(add3, get1, get2, get3);
    expect(res).toBe(6);
  });

  it('Should propagate error if it occurs', async () => {
    const get1 = () => Promise.resolve(1);
    const get2 = () => Promise.resolve(2);
    const get3 = () => Promise.reject(new Error('Could not get 3'));

    const res = await liftP3(add3, get1, get2, get3);
    expect(res).toBeInstanceOf(Error);
    expect((res as Error).message).toBe('Could not get 3');
  });
});
