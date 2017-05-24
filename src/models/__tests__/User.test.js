// @flow

import User from '../User';

it('should whitelist props given', () => {
  expect(
    new User({
      name: 'The Hulk',
      superhero: true,
    })
  ).not.toHaveProperty('superhero');
});
