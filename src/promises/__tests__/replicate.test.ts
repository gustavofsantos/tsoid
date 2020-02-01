import { replicate } from '../../index';

describe('replicate', () => {
  it('Should replicate the action successfully', async () => {
    const fn = jest.fn();
    await replicate(5, fn);
    expect(fn).toBeCalledTimes(5);
  });

  it('Should stop replication if any error occur', async () => {
    const fn = jest.fn(() => Promise.reject(new Error('Stop in the first invocation')));

    const res = await replicate(5, fn);

    expect(fn).toBeCalledTimes(1);
    expect(res).toBeInstanceOf(Error);
    expect((res as Error).message).toBe('Stop in the first invocation');
  });
});
