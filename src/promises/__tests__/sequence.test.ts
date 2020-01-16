import { sequence } from "../../index";

describe('sequenceP', () => {
  it('Should sequence promise operations', async () => {
    const getTen = () => Promise.resolve(10);
    const getTwenty = () => Promise.resolve(20);

    const result = await sequence([getTen(), getTwenty()]);

    expect(result).toStrictEqual([10, 20]);
  });
});
