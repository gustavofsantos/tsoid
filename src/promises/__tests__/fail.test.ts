import fail from "../fail";

describe('fail', () => {
  it('Should output failed promise', () => {
    const res = fail('This failed');

    res.then(error => expect(error).toBeInstanceOf(Error));
  });
});
