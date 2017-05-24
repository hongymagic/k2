// @flow

import passport from 'koa-passport';

export async function authenticate(ctx: any, next: any) {
  return passport.authenticate('local', (err, user) => {
    if (!user) {
      ctx.throw(401);
    }
    ctx.body = user.token();
  })(ctx, next);
}
