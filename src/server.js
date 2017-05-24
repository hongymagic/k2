// @flow

import Koa from 'koa';
import Router from 'koa-router';
import convert from 'koa-convert';
import logger from 'koa-logger';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import graphqlHTTP from 'koa-graphql';
import { printSchema } from 'graphql';
import log from 'fancy-log';
import passport from './passport';
import schema from './schema';

const app = new Koa();

app.use(logger());
app.use(convert(cors({ credentials: true })));
app.use(bodyParser());
app.use(passport.initialize());

// Custom API modules that define their own routes.
const modules = require('./modules');
modules(app);

// GraphQL API.
const router = new Router();

router.get(
  '/graphql/schema',
  (ctx) => {
    ctx.type = 'text/plain';
    ctx.body = printSchema(schema);
  }
);

router.all(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== 'production',
    pretty: process.env.NODE_ENV !== 'production',
  })
);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT, () => log(`API server started on ${process.env.PORT}`));
