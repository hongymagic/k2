// @flow

import validateUser from '../../middleware/validate-user';
import * as graphql from './controller';

export const baseUrl = '/graphql';

export default [
  {
    method: 'ALL',
    route: '/',
    handlers: [validateUser, graphql.http],
  },
  {
    method: 'GET',
    route: '/schema',
    handlers: [validateUser, graphql.print],
  },
];
