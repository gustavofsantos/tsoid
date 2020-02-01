import { liftP2 } from '../lift';

describe('liftP2', () => {
  const add = (x: number, y: number) => x + y;
  const getOne = () => new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });

  it('Should lift a function with 2-arity into two promises', () => {
    const getTen = () => Promise.resolve(10);
    const getSeven = () => Promise.resolve(7);

    const result = liftP2(add, getTen, getSeven);

    result.then((value) => {
      expect(value).toBe(17);
    });
  });

  it('Should lift a function with 2-arity into two delayed promises', async () => {
    const getTwo = () => new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, 500);
    });

    const result = await liftP2(add, getOne, getTwo);

    expect(result).toBe(3);
  });

  it('Should propagate an Error', async () => {
    const getTwo = () => new Promise<number>((_, reject) => {
      reject(new Error('Some error message'));
    });

    const result = await liftP2(add, getOne, getTwo);

    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe('Some error message');
  });
});
