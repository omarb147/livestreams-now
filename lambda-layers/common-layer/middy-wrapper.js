const middy = require("middy");
const { httpSecurityHeaders, httpErrorHandler } = require("middy/middlewares");

module.exports = (handler) => {
  return middy(handler).use(httpErrorHandler());
};
