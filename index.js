/**
 * Bootstrap core and webpack
 */
require('./src/components/helpers/logger');
/**
 * Bootstrap our server
 */
require('babel-register');

if (process.env.NODE_ENV !== "production") {
  require('http').createServer(require('./app').callback()).listen(process.env.PORT || 1998);
// eslint-disable-next-line no-console
  console.log("Started webserver on http://localhost:" + (process.env.PORT || 1998));
} else {
  require('./src/server/server');
}