import exec from '../exec';

describe('exec', () => {
  it('Should exec all actions without error', async () => {
    const updateDatabase = () => Promise.resolve(true);
    const notifyUsers = () => Promise.resolve(true);
    const dropInstance = () => Promise.resolve(true);

    const res = await exec(updateDatabase, notifyUsers, dropInstance);
    expect(res).toBe(undefined);
  });

  it('Should propagate errors', async () => {
    const updateDatabase = () => Promise.resolve(true);
    const notifyUsers = () => Promise.reject(new Error('Could not notify all the users'));
    const dropInstance = () => Promise.resolve(true);

    const res = await exec(updateDatabase, notifyUsers, dropInstance);
    expect(res).toBeInstanceOf(Error);
    expect((res as Error).message).toBe('Could not notify all the users');
  });
});
