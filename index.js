/**
 * Bootstrap core and webpack
 */
require('./src/components/helpers/logger');
/**
 * Bootstrap our server
 */
require('babel-register');

if (process.env.NODE_ENV !== "production") {
  require('./src/server/dev-server');
} else {
  require('./src/server/server');
}
