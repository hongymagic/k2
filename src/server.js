// @flow

import Koa from 'koa';
import Router from 'koa-router';
import convert from 'koa-convert';
import logger from 'koa-logger';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import log from 'fancy-log';
import passport from './passport';

const app = new Koa();

app.use(logger());
app.use(convert(cors({ credentials: true })));
app.use(bodyParser());
app.use(passport.initialize());

// Custom API modules that define their own routes.
const modules = require('./modules');
modules(app);

const port = process.env.PORT || 5000;
app.listen(port, () => log(`API server started on ${port}`));
