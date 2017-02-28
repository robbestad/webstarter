/**
 * Bootstrap core and webpack
 */
require('./src/components/helpers/logger');
/**
 * Bootstrap our server
 */
require('babel-register');

if (process.env.NODE_ENV !== "production") {
  require('./dev-server');
  // require('http').createServer(require('./app').callback()).listen(process.env.PORT || 1998);
} else {
  require('./src/server/server');
}
