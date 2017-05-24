// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from './Node';

export default new GraphQLObjectType({
  name: 'User',

  fields: {
    id: globalIdField(),

    email: {
      type: GraphQLString,
    },
  },

  interfaces: [
    nodeInterface,
  ],
});
