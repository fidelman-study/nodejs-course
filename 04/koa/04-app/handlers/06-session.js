// in-memory store by default (use the right module instead)
const session = require('koa-generic-session');
const convert = require('koa-convert');

// const sessions = {
 //  id1: {count: 10, user: 'John'}
//}

// ctx.session = {}

exports.init = app => app.use(convert(session({
  cookie: {
    signed: false
  }
})));
