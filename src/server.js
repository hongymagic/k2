// @flow

import Koa from 'koa';
import Router from 'koa-router';
import convert from 'koa-convert';
import logger from 'koa-logger';
import cors from 'kcors';
import jwt from 'koa-jwt';
import bodyParser from 'koa-bodyparser';
import passport from './passport';

const app = new Koa();

if (process.env.NODE_ENV === 'development') {
  app.use(logger());
}
app.use(convert(cors({ credentials: true })));
app.use(bodyParser());
app.use(passport.initialize());

// Parse Authorization Header for JWT tokens, and set ctx.state.user if token is
// valid. Passthrough to middleware to make decisions on whether or not their
// routes require users. See src/middleware/validate-user.js
app.use(jwt({ secret: process.env.APP_SECRET, passthrough: true }));

// Custom API modules that define their own routes.
const modules = require('./modules');
modules(app);

export default app;
