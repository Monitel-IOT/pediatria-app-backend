const { palindrome } = require('../utils_for_test/for_testing');

test('palindrome of midudev', () => {
  const result = palindrome('midudev');

  expect(result).toBe('vedudim');
});

test.skip('palindrome of empty string', () => {
  const result = palindrome('');

  expect(result).toBe('');
});

test.skip('palindrome of undefined', () => {
  const result = palindrome();

  expect(result).toBeUndefined();
});
