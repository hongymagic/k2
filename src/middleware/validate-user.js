// @flow

import User from '../models/User';

export default async function validateUser(ctx: any, next: any) {
  if (!ctx.state.user) {
    return ctx.throw(401);
  }

  // Convert koa-jwt's ctx.state.user Object to the User model.
  ctx.state.user = new User(ctx.state.user);

  if (next) {
    return next();
  }
}
