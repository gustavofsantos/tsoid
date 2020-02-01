import safe from '../safe';

describe('safe', () => {
  const functionThatThrow = async (n: number) => {
    if (n === 3) {
      throw new Error('Error!');
    }

    return n;
  };

  it('Should execute the computation safely', async () => {
    const res = await safe(functionThatThrow, 2);
    expect(res).toBe(2);
  });

  it('Should execute the computation that throws safely', async () => {
    const res = await safe(functionThatThrow, 3);
    expect(res).toBeInstanceOf(Error);
    expect((res as Error).message).toBe('Error!');
  });
});
