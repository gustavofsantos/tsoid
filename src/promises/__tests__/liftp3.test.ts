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

  it('Should handle if the first action return Error', async () => {
    const get1 = async () => new Error('Error in get1');
    const get2 = async () => 2;
    const get3 = async () => 3;

    // @ts-ignore
    const res = await liftP3(add3, get1, get2, get3);
    expect(res).toBeInstanceOf(Error);
    expect((res as Error).message).toBe('Error in get1');
  });

  it('Should handle if the second action return Error', async () => {
    const get1 = async () => 1;
    const get2 = async () => new Error('Error in get2');
    const get3 = async () => 3;

    // @ts-ignore
    const res = await liftP3(add3, get1, get2, get3);
    expect(res).toBeInstanceOf(Error);
    expect((res as Error).message).toBe('Error in get2');
  });

  it('Should handle if the third action return Error', async () => {
    const get1 = async () => 1;
    const get2 = async () => 2;
    const get3 = async () => new Error('Error in get3');

    // @ts-ignore
    const res = await liftP3(add3, get1, get2, get3);
    expect(res).toBeInstanceOf(Error);
    expect((res as Error).message).toBe('Error in get3');
  });
});
