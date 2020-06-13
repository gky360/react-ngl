import { hello } from './hello';

describe('utils/hello', () => {
  test('returns a greeting.', () => {
    expect(hello('world')).toEqual('Hello, world');
  });
});
