// @flow

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import User from '../models/User';

/* eslint-disable global-require */
const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
      case 'User':
        return User.findOne({ id });
      default:
        return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return require('./UserType').default;
    }

    if (obj instanceof Article) {
      return require('./ArticleType').default;
    }

    return null;
  },
);

export { nodeInterface, nodeField, nodesField };
