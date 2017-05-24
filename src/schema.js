// @flow

import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
} from 'graphql-relay';
import { nodeField, nodesField } from './types/Node';
import UserType from './types/UserType';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      node: nodeField,
      nodes: nodesField,
      me: {
        type: UserType,
        resolve(root, args, { user }) {
          return user;
        },
      },
    },
  }),
});
