// @flow

import DataLoader from 'dataloader';
import User from './models/User';

/**
 * Data access utility to be used with GraphQL resolve() functions. For example:
 *
 *   new GraphQLObjectType({
 *     ...
 *     resolve(post, args, { loader }) {
 *       return loader.users.load(post.authorId);
 *     }
 *   })
 *
 * For more information visit https://github.com/facebook/dataloader
 */
export default {
  create: () => ({
    users: new DataLoader(keys => User.findByIds(keys)),
  }),
};
