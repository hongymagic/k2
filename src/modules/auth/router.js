// @flow

import * as auth from './controller';

export const baseUrl = '/authenticate';

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [auth.authenticate],
  },
];
