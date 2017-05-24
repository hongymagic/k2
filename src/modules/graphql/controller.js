// @flow

import graphqlHTTP from 'koa-graphql';
import { printSchema } from 'graphql';
import schema from '../../schema';

export const http = graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
  pretty: process.env.NODE_ENV !== 'production',
});

export async function print(ctx: any) {
  ctx.type = 'text/plain';
  ctx.body = printSchema(schema);
}
