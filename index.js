/**
 * Bootstrap core and webpack
 */
require('./core/helpers/logger');
require('./core/compile');
/**
 * Bootstrap our server
 */

// require('babel-register');
// require('./src/server/server');
const https = require('spdy');
const app = require('./app');

const options = {
  spdy: {
    protocols: ['h2'],
    plain: false
  }
};
https.createServer(options, app.callback()).listen(process.env.PORT || 1998);

//eslint-disable-next-line no-console
console.log("Started webserver on http://localhost:" + (process.env.PORT || 1998));
