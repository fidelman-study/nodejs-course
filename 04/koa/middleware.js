module.exports = async function(ctx, next) {
  console.log('--> request start', ctx.url);

  let time = new Date();

  await next();

  time = new Date() - time;

  console.log('<-- request end', time, 'ms');
  // node.js finished, but...
  // response body may be not yet fully sent out,
  // use on-finished for that (or see koa-logger how to track full body length)
};
